import Joi from "joi"
import countries from "i18n-iso-countries";

export const validateCountryCode = (country: string, helpers: Joi.CustomHelpers) => {
    const res = countries.getAlpha2Code(country, "en") || countries.toAlpha2(country);
    if (!res){
        return helpers.error("country.invalid");
    }
    return res;
}

export const countrySchema = Joi.string()
    .custom(validateCountryCode, 'Country Validation')
    .messages({
        'country.invalid': 'The country provided is invalid. Please provide a valid ISO 3166-1 alpha-2, alpha-3, or numeric code.'
    });

export default countrySchema