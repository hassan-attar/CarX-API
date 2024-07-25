import Joi from "joi";
import BaseConfig, { BaseConfig as BaseConfigInterface } from "./base";
import Assert from "node:assert";

// Define the schema for database configuration with uppercase environment variable names
const dbConfigSchema = Joi.object({
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.string().required(),
    DB_DIALECT: Joi.string().required(),
    DB_PROTOCOL: Joi.string().required(),
    CA_CERT: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_MIN_POOL_SIZE: Joi.string().optional(),
    DB_MAX_POOL_SIZE: Joi.string().optional(),
})
    .unknown()
    .required();

// Validate environment variables
const { error, value: envVars } = dbConfigSchema.validate(process.env, {
    abortEarly: false,
});

Assert(
    !error,
    `DbConfig validation error: ${error?.message || "Unknown error"}`,
);

// Define the interface for the database configuration with uppercase names
interface DbConfig extends BaseConfigInterface {
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
const dbConfig: DbConfig = {
    DB_USERNAME: envVars.DB_USERNAME,
    DB_PASSWORD: envVars.DB_PASSWORD,
    DB_HOST: envVars.DB_HOST,
    DB_PORT: envVars.DB_PORT,
    DB_DIALECT: envVars.DB_DIALECT,
    DB_PROTOCOL: envVars.DB_PROTOCOL,
    CA_CERT: envVars.CA_CERT.replace(/<NEWLINE>/g, "\n"), // Format certificate
    DB_NAME: envVars.DB_NAME,
    DB_MIN_POOL_SIZE: envVars.DB_MIN_POOL_SIZE ? +envVars.DB_MIN_POOL_SIZE : 5,
    DB_MAX_POOL_SIZE: envVars.DB_MAX_POOL_SIZE ? +envVars.DB_MAX_POOL_SIZE : 10,
    ...BaseConfig,
};

export default Object.freeze(dbConfig);
