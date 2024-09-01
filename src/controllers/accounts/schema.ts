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
    firstName: Joi.string().max(100).optional().empty('').strip(),
    lastName: Joi.string().max(100).optional().empty('').strip(),
    dob: dobSchema.optional().empty('').strip(),
    phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/)
      .message('Invalid phone number format; Please use E.164 format.')
      .optional()
      .empty('')
      .strip(),
    DLN: Joi.string().max(100).optional().empty('').strip(),
    DLExpirationDate: Joi.date().iso().min('now')
      .when('DLN', {
          is: Joi.exist(),
          then: Joi.required(),
          otherwise: Joi.optional().empty('').strip(),
      }),
    DLCountry: countrySchema.max(100).optional().empty('').strip(),
    DLRegion: regionSchemaCreator({ regionFieldName: "DLRegion", countryFieldName: "DLCountry" })
      .max(100)
      .optional()
      .empty('')
      .strip(),
})
  .and("DLN", "DLExpirationDate")
  .options({
      stripUnknown: {
          objects: true, // Strips unknown keys in objects
          arrays: false  // Retains unknown values in arrays
      }
  });



export default profileBodySchema;
