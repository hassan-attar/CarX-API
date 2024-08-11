import {RequestHandler} from "express";
import {StatusCodes} from "http-status-codes";
import db from "../../models/application/db";
import AssumptionViolationError from "../../errors/ServerError/AssumptionViolationError";
import {saveProfileImage} from "../../utils/imageProcessing";
import profileBodySchema from "../accounts/schema";
import ValidationError from "../../errors/ClientError/ValidationError";

const URL = "http://localhost:8080/static"
export const getProfile: RequestHandler = async (req,res, next) => {
    // @ts-ignore
    const appUser = await db.User.findByPk(req.user!.userId);
    if(!appUser){
        return next(new AssumptionViolationError({
            assumption: "User was able to login and get authenticated, but it's data is not in the app database.",
            whereInitiated: req.originalUrl,
            errorObj: null
        }))
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


export const patchProfile: RequestHandler = async (req,res, next) => {
    try{
        const { error, value: body } = profileBodySchema.validate(req.body, {
            abortEarly: false,
        });
        if (error) return next(new ValidationError({message: "Invalid body data; Please fix your mistakes and try again.", details: error.details}))

        const filename = req.file && await saveProfileImage({filename: req.file.filename, filePath: req.file.path})

        // @ts-ignore
        const user = await db.User.findByPk(req.user!.userId)
        if(!user){
            return next(new AssumptionViolationError({
                assumption: "User was able to login and get authenticated, but it's data is not in the app database.",
                whereInitiated: req.originalUrl,
                errorObj: null,
            }))
        }

        body.firstName && (user.firstName = body.firstName);
        body.lastName && (user.lastName = body.lastName);
        body.dob && (user.dob = new Date(body.dob));
        body.DLN && (user.DLN = body.DLN);
        body.DLCountry && (user.DLCountry = body.DLCountry);
        body.DLRegion && (user.DLRegion = body.DLRegion);
        body.DLExpirationDate && (user.DLExpirationDate = new Date(body.DLExpirationDate));
        req.file && (user.profileImage = filename && (URL+`/${filename}`));
        await user.save()
        res.status(200).json({
            message: "Your profile has been modified successfully; allow up to 5 minutes for your image to get updated."
        })
    }catch (err){
        console.log("error Data removed")
        console.log(err)
    }
}


