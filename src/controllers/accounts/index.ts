import {RequestHandler} from "express";
import {StatusCodes} from "http-status-codes";
import db from "../../models/application/db";


export const getProfile: RequestHandler = async (req,res, next) => {
    // @ts-ignore
    const appUser = await db.User.findByPk(req.user!.userId);
    if(!appUser){
        return next(new Error("Something went wrong"))
    }
    return res.status(StatusCodes.OK).json({
        "firstName": appUser.firstName,
        "lastName": appUser.lastName,
        // @ts-ignore
        "email": req.user.email,
        // @ts-ignore
        "phone": req.user.phone,
        "dob": appUser.dob,
        "profileImage": appUser.profileImage,
        // @ts-ignore
        "hasEmailVerified": req.user.hasEmailVerified,
        // @ts-ignore
        "hasPhoneVerified": req.user.hasPhoneVerified,
        "DLN": appUser.DLN,
        "DLExpirationDate": appUser.DLExpirationDate,
        "DLCountry": appUser.DLCountry,
        "DLRegion": appUser.DLRegion
    });
}

// @ts-ignore
export const updateProfile: RequestHandler = async (req,res) => {
    return;
}


