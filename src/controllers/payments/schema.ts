import Joi from "joi";

interface CheckoutSessionBody {
    currency: string;
    countryName: string;
    carId: string;
    from: Date,
    to: Date,
    tripId?: string;
}

export const CheckoutSessionBodySchema = Joi.object<CheckoutSessionBody>({
    carId: Joi.string().max(100).required(),
    from: Joi.date().iso().min("now").required(),
    to: Joi.date().iso().min(Joi.ref("from")).required()
})

export const SessionStatusSchema = Joi.object<{session_id: string }>({
    session_id: Joi.string().max(128).required(),
})


export const GetCheckoutSessionSchema = Joi.object<{tripId: string }>({
    tripId: Joi.string().max(100).required(),
})
