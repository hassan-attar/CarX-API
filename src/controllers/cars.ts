import { Request, Response } from "express";
import db from "../models/db";

async function getCars(_: Request, res: Response) {
    try {
        const cars = await db.Car.findAll({ limit: 10 });
        res.status(200).json(cars);
    } catch (err) {
        console.log("Error in getCars: ", err);
        res.status(500).json("Something went Wrong");
    }
}

async function getCarById(req: Request, res: Response) {
    try {
        const car = await db.Car.findOne({
            attributes: { exclude: ["hostId"] },
            where: { carId: req.params.carId },
            include: {
                model: db.Host,
                as: "Host",
                attributes: [
                    "hostId",
                    "firstName",
                    "lastName",
                    "createdAt",
                    "profileImage",
                ],
            },
        });
        if (!car) {
            return res.status(404).json("Car not found");
        }
        return res.status(200).json(car);
    } catch (err) {
        console.log("Error in getCars: ", err);
        res.status(500).json("Something went Wrong");
    }
}

export default {
    getCars,
    getCarById,
};
