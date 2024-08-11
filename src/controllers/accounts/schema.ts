import Joi from "joi";
import countrySchema from "../../validators/country";
import dobSchema from "../../validators/dob";
import regionSchemaCreator from "../../validators/region";

interface ProfileUpdateBody {
    firstName: string,
    lastName: string,
    dob: Date,
    DLN: string,
    DLExpirationDate: string,
    DLCountry: string,
    DLRegion: string
}

const profileBodySchema = Joi.object<ProfileUpdateBody>({
    firstName: Joi.string().max(100).optional(),
    lastName:  Joi.string().max(100).optional(),
    dob: dobSchema.max(100).optional(),
    DLN: Joi.string().max(100).optional(),
    DLExpirationDate: Joi.date().iso().min('now').optional()
        .when('DLN', {
            is: Joi.exist(),
            then: Joi.required(),
            otherwise: Joi.optional()
        }),
    DLCountry: countrySchema.max(100).optional(),
    DLRegion: regionSchemaCreator({regionFieldName: "DLRegion", countryFieldName: "DLCountry"}).max(100).optional(),
}).and("DLN", "DLExpirationDate")


export default profileBodySchema;
