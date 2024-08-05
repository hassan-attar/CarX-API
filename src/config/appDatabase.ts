import Joi from "joi";
import BaseConfig, { BaseConfig as BaseConfigInterface } from "./base";
import Assert from "node:assert";
import {baseConfig} from "./index";

// Define the schema for database configuration with uppercase environment variable names
const appDbConfigSchema = Joi.object({
    DB_APP_USERNAME: Joi.string().required(),
    DB_APP_PASSWORD: Joi.string().required(),
    DB_APP_HOST: Joi.string().required(),
    DB_APP_PORT: Joi.string().required(),
    DB_APP_DIALECT: Joi.string().required(),
    DB_APP_PROTOCOL: Joi.string().required(),
    DB_APP_NAME: Joi.string().required(),
    DB_APP_MIN_POOL_SIZE: Joi.string().optional(),
    DB_APP_MAX_POOL_SIZE: Joi.string().optional(),
}).append(
    baseConfig.NODE_ENV === 'production' ? {
        DB_APP_CA_CERT: Joi.string().required()
    } : {})
    .unknown()
    .required();

// Validate environment variables
const { error, value: envVars } = appDbConfigSchema.validate(process.env, {
    abortEarly: false,
});

Assert(
    !error,
    `DbConfig validation error: ${error?.message || "Unknown error"}`,
);

// Define the interface for the database configuration with uppercase names
interface AppDbConfig extends BaseConfigInterface {
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_DIALECT: string;
    DB_PROTOCOL: string;
    CA_CERT?: string;
    DB_NAME: string;
    DB_MIN_POOL_SIZE: number;
    DB_MAX_POOL_SIZE: number;
}

// Create the configuration object with uppercase names
const appDbConfig: AppDbConfig = {
    DB_USERNAME: envVars.DB_APP_USERNAME,
    DB_PASSWORD: envVars.DB_APP_PASSWORD,
    DB_HOST: envVars.DB_APP_HOST,
    DB_PORT: envVars.DB_APP_PORT,
    DB_DIALECT: envVars.DB_APP_DIALECT,
    DB_PROTOCOL: envVars.DB_APP_PROTOCOL,
    CA_CERT: baseConfig.NODE_ENV === 'production'? envVars.DB_APP_CA_CERT.replace(/<NEWLINE>/g, "\n"): undefined, // Format certificate
    DB_NAME: envVars.DB_APP_NAME,
    DB_MIN_POOL_SIZE: envVars.DB_APP_MIN_POOL_SIZE
        ? +envVars.DB_APP_MIN_POOL_SIZE
        : 5,
    DB_MAX_POOL_SIZE: envVars.DB_APP_MAX_POOL_SIZE
        ? +envVars.DB_APP_MAX_POOL_SIZE
        : 10,
    ...BaseConfig,
};

export default Object.freeze(appDbConfig);
