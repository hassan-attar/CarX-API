import Joi from "joi"
import iso3166 from "iso-3166-2";

interface Options {
    countryFieldName?: string;
    regionFieldName?: string;
}

const regionSchemaCreator = (options: Options | undefined = undefined) => {
    const regionFieldName = options?.regionFieldName || "region";
    const countryFieldName = options?.countryFieldName || "country";
    const validateRegion = (region: string, helpers: Joi.CustomHelpers) => {
        const otherFields = helpers.state.ancestors[0];
        const country = otherFields[countryFieldName]
        if (!country){
            return helpers.error(`${regionFieldName}.no-${countryFieldName}`);
        }
        const result = iso3166.subdivision(country, region)
        if(!result){
            return helpers.error(`${regionFieldName}.invalid`);
        }
        return result.regionCode;
    }

    return Joi.string()
            .custom(validateRegion, `${regionFieldName} Validation`)
            .messages({
                [`${regionFieldName}.invalid`]: `The ${regionFieldName} provided is invalid for the given ${countryFieldName}. Please ensure the ${regionFieldName} follows the ISO 3166-2 standard for subdivisions.`,
                [`${regionFieldName}.no-${countryFieldName}`]: `You must provide a ${countryFieldName}. Please specify the ${countryFieldName} in order to specify the ${regionFieldName}.`
            });

}



export default regionSchemaCreator;