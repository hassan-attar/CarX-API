import Joi from "joi";
import currencySchemaCreator from "../../schemas/currency";
import countrySchema from "../../schemas/country";

interface CheckoutSessionBody {
    currency: string;
    countryName: string;
    carId: string;
    from: Date,
    to: Date,
}



const CheckoutSessionBodySchema = Joi.object<CheckoutSessionBody>({
    countryName: countrySchema.optional(),
    currency: currencySchemaCreator({currencyCodeFieldName: "currencyCode", countryFieldName: "countryName"}).optional().default("USD"),
    carId: Joi.string().max(100).required(),
    from: Joi.date()
        .iso()
        .min("now")
        .required(),
    to: Joi.date().iso().min(Joi.ref("from")).required(),
})


export default CheckoutSessionBodySchema;
