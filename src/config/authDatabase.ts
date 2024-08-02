import Joi from "joi";
import BaseConfig, { BaseConfig as BaseConfigInterface } from "./base";
import Assert from "node:assert";

// Define the schema for database configuration with uppercase environment variable names
const authDbConfigSchema = Joi.object({
    DB_AUTH_USERNAME: Joi.string().required(),
    DB_AUTH_PASSWORD: Joi.string().required(),
    DB_AUTH_HOST: Joi.string().required(),
    DB_AUTH_PORT: Joi.string().required(),
    DB_AUTH_DIALECT: Joi.string().required(),
    DB_AUTH_PROTOCOL: Joi.string().required(),
    DB_AUTH_CA_CERT: Joi.string().required(),
    DB_AUTH_NAME: Joi.string().required(),
    DB_AUTH_MIN_POOL_SIZE: Joi.string().optional(),
    DB_AUTH_MAX_POOL_SIZE: Joi.string().optional(),
})
    .unknown()
    .required();

// Validate environment variables
const { error, value: envVars } = authDbConfigSchema.validate(process.env, {
    abortEarly: false,
});

Assert(
    !error,
    `DbConfig validation error: ${error?.message || "Unknown error"}`,
);

// Define the interface for the database configuration with uppercase names
interface AuthDbConfig extends BaseConfigInterface {
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_DIALECT: string;
    DB_PROTOCOL: string;
    CA_CERT: string;
    DB_NAME: string;
    DB_MIN_POOL_SIZE: number;
    DB_MAX_POOL_SIZE: number;
}

// Create the configuration object with uppercase names
const authDbConfig: AuthDbConfig = {
    DB_USERNAME: envVars.DB_AUTH_USERNAME,
    DB_PASSWORD: envVars.DB_AUTH_PASSWORD,
    DB_HOST: envVars.DB_AUTH_HOST,
    DB_PORT: envVars.DB_AUTH_PORT,
    DB_DIALECT: envVars.DB_AUTH_DIALECT,
    DB_PROTOCOL: envVars.DB_AUTH_PROTOCOL,
    CA_CERT: envVars.DB_AUTH_CA_CERT.replace(/<NEWLINE>/g, "\n"), // Format certificate
    DB_NAME: envVars.DB_AUTH_NAME,
    DB_MIN_POOL_SIZE: envVars.DB_AUTH_MIN_POOL_SIZE
        ? +envVars.DB_AUTH_MIN_POOL_SIZE
        : 5,
    DB_MAX_POOL_SIZE: envVars.DB_AUTH_MAX_POOL_SIZE
        ? +envVars.DB_AUTH_MAX_POOL_SIZE
        : 10,
    ...BaseConfig,
};

export default Object.freeze(authDbConfig);
