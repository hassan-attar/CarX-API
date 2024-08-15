import Joi from "joi";
import countrySchema from "../../schemas/country";
import dobSchema from "../../schemas/dob";
import regionSchemaCreator from "../../schemas/region";

interface ProfileUpdateBody {
    firstName: string,
    lastName: string,
    dob: Date,
    DLN: string,
    phone: string;
    DLExpirationDate: string,
    DLCountry: string,
    DLRegion: string
}

const profileBodySchema = Joi.object<ProfileUpdateBody>({
    firstName: Joi.string().max(100).optional(),
    lastName:  Joi.string().max(100).optional(),
    dob: dobSchema.optional(),
    phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/)
        .message('Invalid phone number format; Please use E.164 format.').optional(),
    DLN: Joi.string().max(100).optional(),
    DLExpirationDate: Joi.date().iso().min('now')
        .when('DLN', {
            is: Joi.exist(),
            then: Joi.required(),
            otherwise: Joi.optional()
        }),
    DLCountry: countrySchema.max(100).optional(),
    DLRegion: regionSchemaCreator({regionFieldName: "DLRegion", countryFieldName: "DLCountry"}).max(100).optional(),
}).and("DLN", "DLExpirationDate")


export default profileBodySchema;
