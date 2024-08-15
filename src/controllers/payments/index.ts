import { RequestHandler } from "express";
import Stripe from 'stripe';
import paymentConfig from "../../config/payment"
import db from "../../models/application/db";
const stripe = new Stripe(paymentConfig.STRIPE_SECRET_KEY);
import CheckoutSessionBodySchema from "./schema"
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

        const checkoutSession = await stripe.checkout.sessions.create({
            ui_mode: "embedded",
            line_items: [
                {
                    quantity: 1,
                    price_data: {
                        currency: car.currency,
                        product_data: {
                            name: `${car.make} ${car.model}`,
                            images: [`${car.headerImage}`],
                            tax_code: "txcd_20030000",
                        },
                        unit_amount: (car.price) * 100 * (calculateDaysBetween(body.from, body.to)),
                        tax_behavior: "exclusive",
                    },
                }
            ],
            mode: "payment",
            return_url: `http://localhost:8080/return?session_id={CHECKOUT_SESSION_ID}`,
        })

        // await db.Payment.create({
        //     checkoutSessionId: checkoutSession.id,
        //     // @ts-ignore
        //     user_id: req.user.userId,
        //     total: checkoutSession.amount_total!,
        //     subtotal: checkoutSession.amount_subtotal || undefined,
        //     status: "pending",
        //
        // })
        res.json({clientSecret: checkoutSession.client_secret});
    }catch (err){
        res.status(400).json({message: "Something went wrong!"});
        console.log(err)
    }
}


export const getSessionStatus: RequestHandler = async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id as string);
    res.send({
        status: session.status,
        customer_email: session.customer_details!.email
    });
}


const endpointSecret = "whsec_f860fa2529083cb9465666369198d7268038405adbd54b201cf535da723f9de0";

export const checkoutWebHook: RequestHandler = async (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        // @ts-ignore
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        // @ts-ignore
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.async_payment_failed':
            const checkoutSessionAsyncPaymentFailed = event.data.object;
            console.log('checkoutSessionAsyncPaymentFailed: ', checkoutSessionAsyncPaymentFailed);
            // Then define and call a function to handle the event checkout.session.async_payment_failed
            break;
        case 'checkout.session.async_payment_succeeded':
            const checkoutSessionAsyncPaymentSucceeded = event.data.object;
            console.log('checkoutSessionAsyncPaymentSucceeded: ', checkoutSessionAsyncPaymentSucceeded);
            // Then define and call a function to handle the event checkout.session.async_payment_succeeded
            break;
        case 'checkout.session.completed':
            const checkoutSessionCompleted = event.data.object;
            console.log('checkoutSessionCompleted: ', checkoutSessionCompleted);
            // if (!payment){
            //     return;
            // }
            // if (checkoutSessionCompleted.status === "complete"){
            //     payment.status = "succeeded";
            // }else {
            //     payment.status = "failed";
            // }
            break;
        case 'checkout.session.expired':
            const checkoutSessionExpired = event.data.object;
            // Then define and call a function to handle the event checkout.session.expired
            console.log('checkoutSessionExpired: ', checkoutSessionExpired);
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
}