import { RequestHandler } from "express";
import Stripe from 'stripe';
import paymentConfig from "../../config/payment"
import db from "../../models/application/db";
const stripe = new Stripe(paymentConfig.STRIPE_SECRET_KEY);
import {CheckoutSessionBodySchema, SessionStatusSchema, GetCheckoutSessionSchema} from "./schema"
import ValidationError from "../../errors/ClientError/ValidationError";
import ItemNotFoundError from "../../errors/ClientError/ItemNotFoundError";

function calculateDaysBetween(from: Date, to: Date) {
    // Calculate the difference in milliseconds
    // @ts-ignore
    const differenceInMilliseconds = to - from;

    // Convert milliseconds to days
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    return Math.floor(differenceInMilliseconds / millisecondsPerDay);
}

export const getCheckout : RequestHandler = async (req, res, next) => {
    const { error, value: data } = GetCheckoutSessionSchema.validate(req.query, {
        abortEarly: false,
    });
    if (error) return next(new ValidationError({message: "Invalid body data; Please fix your mistakes and try again.", details: error.details}))
    const tripId = data.tripId
    const trip = await db.Trip.findByPk(tripId, {include: {model: db.Payment, as: "Payment", attributes: ["checkoutSessionId", "status"]}});
    if(!trip) return next(new ItemNotFoundError({message: `Trip with id ${tripId} not found`}))
    // @ts-ignore
    if(trip.Payment.status === "succeeded"){
        return res.status(200).json({"paymentId": trip.paymentId, "status": "succeeded"});
    }
    // @ts-ignore
    const checkoutSession = await stripe.checkout.sessions.retrieve(trip.Payment.checkoutSessionId)
    return res.json({"paymentId": trip.paymentId, "status": "pending", "clientSecret": checkoutSession.client_secret});
}

export const createCheckoutSession: RequestHandler = async (req, res, next) => {
    try{
        const { error, value: body } = CheckoutSessionBodySchema.validate(req.body, {
            abortEarly: false,
        });
        if (error) return next(new ValidationError({message: "Invalid body data; Please fix your mistakes and try again.", details: error.details}))
        const car = await db.Car.findByPk(body.carId)
        if(!car){
            return next(new ItemNotFoundError({message: `Car with id ${body.carId} not found; Please fix your mistakes and try again.`}));
        }
        if(!(await db.CarAvailability.isAvailable(body.carId, body.from, body.to))){
            return next(new ValidationError({message: `Car is not available within ${body.from.toISOString()} to ${body.to.toISOString()}.`}));
        }
        const checkoutSession = await stripe.checkout.sessions.create({
            ui_mode: "embedded",
            line_items: [
                {
                    quantity: 1,
                    price_data: {
                        currency: car.currency,
                        product_data: {
                            name: `${car.make} ${car.model} ${car.year}`,
                            images: [`${car.headerImage}`],
                            tax_code: "txcd_10000000",
                        },
                        unit_amount: Math.ceil((car.price) * 100 * (calculateDaysBetween(body.from, body.to))),
                        tax_behavior: "exclusive",
                    },
                },
                {
                    quantity: 1,
                    price_data: {
                        currency: car.currency,
                        product_data: {
                            name: `Service Fee`,
                            tax_code: "txcd_10000000",
                        },
                        unit_amount: Math.ceil(Math.ceil((car.price) * 100 * (calculateDaysBetween(body.from, body.to))) * 0.10),
                        tax_behavior: "exclusive",
                    }
                }
            ],
            automatic_tax: {enabled: true},
            expires_at: Math.floor(Date.now() / 1000) + (60 * 31), // 31 minutes
            mode: "payment",
            return_url: `https://${req.headers['x-origin']}/return?session_id={CHECKOUT_SESSION_ID}`,
        })

        const payment = await db.Payment.create({
            checkoutSessionId: checkoutSession.id,
            currency: car.currency,
            status: "pending",
            // @ts-ignore
            total: checkoutSession.amount_total,
            // @ts-ignore
            userId: req.user.userId,
        })
        const trip = await db.Trip.create({
            paymentId: payment.paymentId,
            // @ts-ignore
            userId: req.user.userId,
            carId: car.carId,
            from: body.from,
            to: body.to,
            hostId: car.hostId,
        })
        await db.CarAvailability.makeUnavailable(car.carId, body.from, body.to);
        await stripe.checkout.sessions.update(checkoutSession.id, {
            metadata: {
                tripId: trip.tripId
            }
        })
        res.json({"paymentId": payment.paymentId, "status": payment.status, "clientSecret": checkoutSession.client_secret});
    }catch (err){
        res.status(400).json({message: "Something went wrong!"});
        console.log(err)
    }
}


export const getSessionStatus: RequestHandler = async (req, res, next) => {
    const { error, value: query } = SessionStatusSchema.validate(req.query, {
        abortEarly: false,
    });
    if (error) return next(new ValidationError({message: "Invalid query data; Please fix your mistakes and try again.", details: error.details}))
    const session = await stripe.checkout.sessions.retrieve(query.session_id);
    const payment = await db.Payment.findOne({
        where: {
            checkoutSessionId: query.session_id,
            // @ts-ignore
            userId: req.user.userId
        }
    })
    const trip = await db.Trip.findOne({
        // @ts-ignore
        paymentId: payment.paymentId,
        // @ts-ignore
        userId: req.user.userId
    })

    res.json({
        status: session.status,
        tripId: trip.tripId
    });
}

export const checkoutWebHook: RequestHandler = async (request, response) => {
    const payload = request.body;
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        // @ts-ignore
        event = stripe.webhooks.constructEvent(payload, sig, paymentConfig.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.warn("ERROR: ", err);
        // @ts-ignore
        return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (
        event.type === 'checkout.session.completed'
        || event.type === 'checkout.session.async_payment_succeeded'
    ) {
        await fulfillCheckout(event.data.object.id);
    }else if (event.type === "checkout.session.expired"){
        await revokeTrip(event.data.object.id);
    }
    response.status(200).end();
}

async function fulfillCheckout(sessionId: string): Promise<Boolean> {
    // Set your secret key. Remember to switch to your live secret key in production.
    // See your keys here: https://dashboard.stripe.com/apikeys
    console.log('Fulfilling Checkout Session ' + sessionId);
    // TODO: Make this function safe to run multiple times,
    // even concurrently, with the same session ID
    // TODO: Make sure fulfillment hasn't already been
    // peformed for this Checkout Session
    const prevPayments = await db.Payment.findOne({where: {checkoutSessionId: sessionId}});
    if(!prevPayments || prevPayments.status === "succeeded") return false;

    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);
    if(checkoutSession.payment_status !== "paid") return false;
    // @ts-ignore
    prevPayments.status = "succeeded";
    await prevPayments.save()
    return true;
}
async function revokeTrip(sessionId: string): Promise<Boolean> {
    const prevPayments = await db.Payment.findOne({where: {checkoutSessionId: sessionId}});
    if(!prevPayments || prevPayments.status === "succeeded") return false;
    const trip = await db.Trip.findOne({
        where: {
            paymentId: prevPayments.paymentId
        }
    })
    if(!trip) return false;
    await db.CarAvailability.makeAvailable(trip.carId, trip.from, trip.to);
    await trip.destroy();
    await prevPayments.destroy();
    return true;
}


export const getPaymentById: RequestHandler = async (req, res) => {
    const paymentId = req.params.paymentId;
    const payment = await db.Payment.findByPk(paymentId)
    return res.json(payment);
}

export const getPayments: RequestHandler = async (req, res) => {
    const payments = await db.Payment.findAll({
        where: {
            // @ts-ignore
            userId: req.user.userId
        },
        attributes:
          {
              exclude: ["userId"]
          }
    })
    return res.json(payments);
}