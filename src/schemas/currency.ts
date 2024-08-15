import Joi from "joi"
import currencyCodes from "currency-codes"
import countries from "i18n-iso-countries";

interface Options {
    countryFieldName?: string;
    currencyCodeFieldName?: string;
}

const currencySchemaCreator = (options: Options | undefined = undefined) => {
    const currencyCodeFieldName = options?.currencyCodeFieldName || "currency";
    const countryFieldName = options?.countryFieldName || "country";
    const validateCurrency = (currency: string, helpers: Joi.CustomHelpers) => {
        let result = currencyCodes.code(currency)
            || currencyCodes.number(currency)
        if(result) return result.code;

        const country = helpers.state.ancestors[0][countryFieldName];
        if(!country) return helpers.error(`${currencyCodeFieldName}.invalid`);
        const countryNames = countries.getNames(country);

        for (const name in countryNames){
            result = currencyCodes.country(name)[0]
            if(result) return result.code;
        }
        return helpers.error(`${currencyCodeFieldName}.invalid`);
    }

    return Joi.string()
        .custom(validateCurrency, `${currencyCodeFieldName} Validation`)
        .messages({
            [`${currencyCodeFieldName}.invalid`]: `The ${currencyCodeFieldName} provided is invalid. Please ensure the ${currencyCodeFieldName} follows the ISO-4217 standard for currencies${countryFieldName? ` or provide ${countryFieldName} field instead of ${currencyCodeFieldName} for country based currency lookup.` : ""}.`,
        });
}



export default currencySchemaCreator;