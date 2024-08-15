import Joi from "joi";

interface CheckoutSessionBody {
    currency: string;
    countryName: string;
    carId: string;
    from: Date,
    to: Date,
    tripId?: string;
}



const CheckoutSessionBodySchema = Joi.object<CheckoutSessionBody>({
    carId: Joi.string().max(100).when("tripId", {
        is: Joi.exist(),
        then: Joi.optional(),
        otherwise: Joi.required()
    }),
    from: Joi.date()
        .iso()
        .min("now")
        .when("tripId", {
            is: Joi.exist(),
            then: Joi.optional(),
            otherwise: Joi.required()
        }),
    to: Joi.date().iso().min(Joi.ref("from")).when("tripId", {
        is: Joi.exist(),
        then: Joi.optional(),
        otherwise: Joi.required()
    }),
    tripId: Joi.string().max(100).optional(),
})


export default CheckoutSessionBodySchema;
