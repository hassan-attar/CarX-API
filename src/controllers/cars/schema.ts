import Joi from "joi";
import regionSchemaCreator from "../../schemas/region";
import countrySchema from "../../schemas/country";

interface CarFilter {
    priceMin?: number;
    priceMax?: number;
    type?: string;
    make?: string;
    model?: string;
    yearMin?: number;
    yearMax?: number;
    distanceIncludedKmMin?: number;
    distanceIncludedKmMax?: number;
    fuelType?: string;
    city?: string;
    region?: string;
    country?: string;
    avgRatingMin?: number;
    avgRatingMax?: number;
    availableFrom: string; // ISO date string
    availableTo: string; // ISO date string
    page: number;
    limit: number;
    lat?: number;
    lng?: number;
    radius?: number;
}


const carFilterSchema = Joi.object<CarFilter>({
    priceMin: Joi.number().positive().optional(),
    priceMax: Joi.number().positive().optional(),
    type: Joi.string().valid("").optional(), // TODO appDb.Car.getAttributes().type.values
    make: Joi.string().max(100).optional(),
    model: Joi.string().max(100).optional(),
    yearMin: Joi.number()
        .integer()
        .min(1900)
        .max(new Date().getFullYear())
        .optional(),
    yearMax: Joi.number()
        .integer()
        .min(Joi.ref("yearMin"))
        .max(new Date().getFullYear())
        .optional(),
    distanceIncludedKmMin: Joi.number().positive().optional(),
    distanceIncludedKmMax: Joi.number()
        .positive()
        .greater(Joi.ref("distanceIncludedKmMin"))
        .optional(),
    fuelType: Joi.string()
        .valid("") //TODO
        .optional(),
    city: Joi.string().max(100).optional(),
    avgRatingMin: Joi.number().min(0).max(5).optional(),
    avgRatingMax: Joi.number().min(Joi.ref("avgRatingMin")).max(5).optional(),
    availableFrom: Joi.date()
        .iso()
        .min("now")
        .default(() => new Date().toISOString())
        .optional(),
    availableTo: Joi.date().iso().min(Joi.ref("availableFrom")).default(() => {
        const date = new Date();
        date.setDate(date.getDate() + 3)
        return date.toISOString();
    }).optional(),
    page: Joi.number().integer().positive().default(1).optional(),
    limit: Joi.number().integer().positive().max(100).default(10).optional(),
    country: countrySchema.max(100).optional(),
    region: regionSchemaCreator().max(100).optional(),
    lat: Joi.number().min(-90).max(90).optional(),
    lng: Joi.number().min(-180).max(180).when("lat", {
        is: Joi.exist(),
        then: Joi.required(),
        otherwise: Joi.optional()
    }),
    radius: Joi.number().min(1).when("lng", {
        is: Joi.exist(),
        then: Joi.optional(),
        otherwise: Joi.forbidden().messages({
            "any.unknown": "The radius field is forbidden when lng and lat is not present."
        })
    }).when("lat",{
        is: Joi.exist(),
        then: Joi.optional(),
        otherwise: Joi.forbidden().messages({
            "any.unknown": "The radius field is forbidden when lng and lat is not present."
        })
    })
}).and("lat", "lng");


export default carFilterSchema;
