import { Request, Response } from "express";
import db from "../../models/application/db";
import carFilterSchema from "./schema";
import {Op} from "sequelize";


async function getCars(req: Request, res: Response) {
    try {
        const { error, value: filters } = carFilterSchema.validate(req.query, {
            abortEarly: false,
        });
        if (error) return res.status(422).json({ error: error.details });
        console.log((filters))
        const availabilities = await db.CarAvailability.findAll({
            where: {
                [Op.and]: {
                    from: { [Op.lte]: filters.availableFrom },
                    ...(filters.availableTo
                        ? { to: { [Op.gte]: filters.availableTo } }
                        : []),
                },
            },
            attributes: ["carId"],
        });
        const cars = await db.Car.findAll({
            where: {
                carId: {
                    [Op.in]: availabilities.map(
                        (availability) => availability.carId,
                    ),
                },
                ...(filters.country ? { country: filters.country } : []),
                ...(filters.region ? { region: filters.region } : []),
                ...(filters.city ? { city: {[Op.iLike]: `%${filters.city}%`}} : []),
                ...(filters.priceMin || filters.priceMax ? {
                    price: {[Op.and]: {
                            [Op.gte]: filters.priceMin || 0,
                            [Op.lte]: filters.priceMax || 1000
                        }}
                }: [])
            },
            limit: filters.limit,
            offset: filters.limit * (filters.page - 1),
        });
        return res.status(200).json(cars);
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
