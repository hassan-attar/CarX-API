import {RequestHandler} from "express";
import db from "../../models/application/db";


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