import Joi from "joi";
import countryAndRegionSchema from "../../validators/countryAndRegion";

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
        .default(new Date().toISOString())
        .optional(),
    availableTo: Joi.date().iso().min(Joi.ref("availableFrom")).optional(),
    page: Joi.number().integer().positive().default(1).optional(),
    limit: Joi.number().integer().positive().max(100).default(10).optional(),
}).concat(countryAndRegionSchema);


export default carFilterSchema;
