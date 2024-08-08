import Joi from "joi";
import countries from "i18n-iso-countries";
import iso3166 from "iso-3166-2"

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

const validateCountryCode = (country: string, helpers: Joi.CustomHelpers) => {
    const res = countries.getAlpha2Code(country, "en") || countries.toAlpha2(country);
    if (!res){
        return helpers.error("country.invalid");
    }
    return res;
}

const validateRegion = (region: string, helpers: Joi.CustomHelpers) => {
    const { country } = helpers.state.ancestors[0];
    if (!country){
        return helpers.error("region.no-country");
    }
    const result = iso3166.subdivision(country, region)
    if(!result){
        return helpers.error("region.invalid");
    }
    return result.regionCode;
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
    country: Joi.string()
        .max(100)
        .optional()
        .custom(validateCountryCode, 'Country Code Validation')
        .messages({
            'country.invalid': 'The country provided is invalid. Please provide a valid ISO 3166-1 alpha-2, alpha-3, or numeric code.'
        }),
    region: Joi.string()
        .max(100)
        .optional()
        .custom(validateRegion, 'Country Code Validation')
        .messages({
            'region.invalid': "The region provided is invalid for the given country. Please ensure the region follows the ISO 3166-2 standard for subdivisions.",
            "region.no-country": 'To filter by a region, you must provide a country. Please specify the country in order to filter by the region.'
        }),
    avgRatingMin: Joi.number().min(0).max(5).optional(),
    avgRatingMax: Joi.number().min(Joi.ref("avgRatingMin")).max(5).optional(),
    availableFrom: Joi.date()
        .iso()
        .default(new Date().toISOString())
        .optional(),
    availableTo: Joi.date().iso().min(Joi.ref("availableFrom")).optional(),
    page: Joi.number().integer().positive().default(1).optional(),
    limit: Joi.number().integer().positive().max(100).default(10).optional(),
});


export default carFilterSchema;
