import { Request, Response } from 'express';


function getCars(_: Request, res: Response) {
    // throw Error("NOT IMPLEMENTED")
    return res.status(200).json({"message": "cars"});
}

function getCarById(_: Request, res: Response) {
    // throw Error("NOT IMPLEMENTED")
    return res.status(200).json({"message": "cars/carId"});
}


export default {
    getCars,
    getCarById
}