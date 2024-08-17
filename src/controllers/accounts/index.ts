import {RequestHandler} from "express";
import {StatusCodes} from "http-status-codes";
import appDb from "../../models/application/db";
import authDb from "../../models/auth/db";
import baseConfig from "../../config/base";
import AssumptionViolationError from "../../errors/ServerError/AssumptionViolationError";
import {saveProfileImage} from "../../utils/imageProcessing";
import profileBodySchema from "../accounts/schema";
import ValidationError from "../../errors/ClientError/ValidationError";

export const getProfile: RequestHandler = async (req,res, next) => {
    // @ts-ignore
    const appUser = await appDb.User.findByPk(req.user!.userId);
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
        let dbUser = await appDb.User.findByPk(req.user!.userId)
        let authUser = null;
        if(!dbUser){
            return next(new AssumptionViolationError({
                assumption: "User was able to login and get authenticated, but it's data is not in the app database.",
                whereInitiated: req.originalUrl,
                errorObj: null,
            }))
        }
        body.firstName && (dbUser.firstName = body.firstName);
        body.lastName && (dbUser.lastName = body.lastName);
        body.dob && (dbUser.dob = new Date(body.dob));
        body.DLN && (dbUser.DLN = body.DLN);
        body.DLCountry && (dbUser.DLCountry = body.DLCountry);
        body.DLRegion && (dbUser.DLRegion = body.DLRegion);
        body.DLExpirationDate && (dbUser.DLExpirationDate = new Date(body.DLExpirationDate));
        req.file && (dbUser.profileImage = filename && (`${baseConfig.HOST}/static/${filename}`));
        if(body.phone){ // better not to have it here, but to support frontend operations, it is implemented here for now.
            // @ts-ignore
            authUser = await authDb.User.findByPk(req.user.userId);
            if(!authUser){
                return next(new AssumptionViolationError({
                    assumption: "User was able to login and get authenticated, but it's data is not in the auth database.",
                    whereInitiated: req.originalUrl,
                    errorObj: null,
                }))
            }
            authUser.phone = body.phone;
            authUser.hasPhoneVerified = false;
            authUser = await authUser.save({returning: ["phone", "hasPhoneVerified"]});
        }
        dbUser = await dbUser.save({returning: ["firstName", "lastName", "profileImage", "DLN", "dob", "DLExpirationDate", "DLCountry", "DLRegion", "DLExpirationDate"]});
        return res.status(StatusCodes.OK).json({
            "firstName": dbUser.firstName,
            "lastName": dbUser.lastName,
            // @ts-ignore
            "email": req.user.email,
            // @ts-ignore
            "phone": (authUser && authUser.phone) || req.user.phone,
            "dob": dbUser.dob,
            "profileImage": dbUser.profileImage,
            // @ts-ignore
            "hasEmailVerified": req.user.hasEmailVerified,
            // @ts-ignore
            "hasPhoneVerified": (authUser && authUser.hasPhoneVerified) || req.user.hasPhoneVerified,
            "DLN": dbUser.DLN,
            "DLExpirationDate": dbUser.DLExpirationDate,
            "DLCountry": dbUser.DLCountry,
            "DLRegion": dbUser.DLRegion
        });
    }catch (err){
        console.log("error Data removed")
        console.log(err)
    }
}


