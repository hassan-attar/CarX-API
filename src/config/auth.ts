import Joi from "joi";
import Assert from "node:assert";
import BaseConfig, { BaseConfig as InterfaceBaseConfig } from "./base";

// Define the schema for authentication configuration
const authConfigSchema = Joi.object({
    GOOGLE_CLIENT_ID: Joi.string().required(),
    GOOGLE_CLIENT_SECRET: Joi.string().required(),
})
    .unknown()
    .required();

// Validate environment variables
const { error, value: envVars } = authConfigSchema.validate(process.env, {
    abortEarly: false,
});

Assert(
    !error,
    `AuthConfig validation error: ${error?.message || "Unknown error"}`,
);

// Define the interface for the authentication configuration
interface AuthConfig extends InterfaceBaseConfig {
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
}

// Create the configuration object
const authConfig: AuthConfig = {
    GOOGLE_CLIENT_ID: envVars.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: envVars.GOOGLE_CLIENT_SECRET,
    ...BaseConfig,
};

export default Object.freeze(authConfig);
