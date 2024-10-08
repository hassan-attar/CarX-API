import "./loadEnv";
import Joi from "joi";
import Assert from "node:assert";

// Define the schema for the configuration
const schema = Joi.object({
    NODE_ENV: Joi.string()
        .valid("development", "production", "test")
        .optional().default("development"),
    HOST: Joi.string().optional().default("http://localhost:8080"),
})
    .unknown()
    .required();

if(!process.env.NODE_ENV) {
    console.warn("NODE_ENV is not set explicitly, defaulting to development...");
}

// Validate environment variables and create configuration object
const { error, value: envVars } = schema.validate(process.env, {
    abortEarly: false,
});

Assert(
    !error,
    `BaseConfig validation error: ${error?.message || "Unknown error"}`,
);

export interface BaseConfig {
    NODE_ENV: string;
    PORT: number;
    HOST: string;
}

// Create the configuration object
const config: BaseConfig = {
    NODE_ENV: envVars.NODE_ENV,
    PORT: process.env.port ? +process.env.port : 8000,
    HOST: envVars.HOST
};

// Freeze the configuration object to make it immutable
export default Object.freeze(config);
