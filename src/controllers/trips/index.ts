import {RequestHandler} from "express";
import db from "../../models/application/db";
import ItemNotFoundError from "../../errors/ClientError/ItemNotFoundError";
import AssumptionViolationError from "../../errors/ServerError/AssumptionViolationError";
import {StatusCodes} from "http-status-codes";
import Stripe from "stripe";
import paymentConfig from "../../config/payment";
const stripe = new Stripe(paymentConfig.STRIPE_SECRET_KEY);

export const getTrips : RequestHandler = async (req, res) => {
    const trips = await db.Trip.findAll({
        where: {
            //@ts-ignore
            userId: req.user.userId
        },
        attributes: {
            exclude: ["hostId"],
        },
        include: [
            {
                model: db.Payment,
                as: "Payment",
                attributes: ["status", "paymentId"]
            },
            {
                model: db.Car,
                as: "Car",
                attributes: ["headerImage", "make", "model", "year", "country", "region", "city"]
            }
        ]
    })
    return res.json(trips);
}

export const getTripById : RequestHandler = async (req, res) => {
    const tripId = req.params.tripId;
    const trip = await db.Trip.findOne({
        where: {
            tripId: tripId,
            //@ts-ignore
            userId: req.user.userId
        },
        attributes: {
            exclude: ["hostId"],
        },
        include: [
            {
                model: db.Host,
                as: "Host",
                attributes: ["firstName", "lastName", "profileImage"],
            },
            {
                model: db.Car,
                as: "Car",
                attributes: {
                    exclude: ["price", "minRentDays", "maxRentDays","extraDistanceCharge", "hostId", "carId"]
                }
            },
            {
                model: db.Payment,
                as: "Payment",
                attributes: ["total", "subtotal", "currency", "status"]
            }
        ],
    })
    // @ts-ignore
    if(trip.Payment.status !== "succeeded"){
        // @ts-ignore
        trip.Car.plateNumber = undefined;
        // @ts-ignore
        trip.Car.address = undefined;
    }
    return res.json(trip);
}


export const cancelPendingTrip : RequestHandler = async (req, res, next) => {
    const tripId = req.params.tripId;
    const trip = await db.Trip.findByPk(tripId)
    if(!trip) return next(new ItemNotFoundError({message: `Trip with id ${tripId} not found.`}));
    const prevPayments = await db.Payment.findByPk(trip.paymentId);
    if(!prevPayments){
        return next(new AssumptionViolationError({
             errorObj: null,
            whereInitiated: "CancelPendingTrips",
            assumption: "A trip was created without having a paymentId."
        }))
    }
    await stripe.checkout.sessions.expire(prevPayments.checkoutSessionId)
    await db.CarAvailability.makeAvailable(trip.carId, trip.from, trip.to);
    await trip.destroy();
    await prevPayments.destroy();
    return res.status(StatusCodes.NO_CONTENT).send();
}