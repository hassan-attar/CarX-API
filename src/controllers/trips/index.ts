import {RequestHandler} from "express";
import db from "../../models/application/db";


export const getTrips : RequestHandler = async (req, res) => {
    const trips = await db.Trip.findAll({
        where: {
            //@ts-ignore
            userId: req.user.userId
        },
        include: [
            {
                model: db.Payment,
                as: "Payment",
                attributes: ["status"]
            }
        ]
    })
    return res.json(trips);
}

export const getTripById : RequestHandler = async (req, res) => {
    const tripId = req.params.tripId;
    const trips = await db.Trip.findOne({
        where: {
            tripId: tripId,
            //@ts-ignore
            userId: req.user.userId
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
    return res.json(trips);
}