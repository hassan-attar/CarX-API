import Joi from "joi"
import iso3166 from "iso-3166-2";
import countrySchema from "./country"

/**
 * Validates region based on the country code (Works for North America, but doesn't work for all EU, e.g. FR IDF)
 * @param region region code based on iso-3166-2
 * @param helpers Joi.CustomHelpers (will be passed automatically by Joi)
 */
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


const countryAndRegionSchema =  Joi.object({
    country: countrySchema,
    region: Joi.string()
        .max(100)
        .optional()
        .custom(validateRegion, 'Region Validation')
        .messages({
            'region.invalid': 'The region provided is invalid for the given country. Please ensure the region follows the ISO 3166-2 standard for subdivisions.',
            'region.no-country': 'To filter by a region, you must provide a country. Please specify the country in order to filter by the region.'
        })
});

export default countryAndRegionSchema;