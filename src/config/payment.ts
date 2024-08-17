import Joi from "joi";
import Assert from "node:assert";
import BaseConfig, { BaseConfig as InterfaceBaseConfig } from "./base";

// Define the schema for authentication configuration
const paymentConfigSchema = Joi.object({
    STRIPE_PUBLISHABLE_KEY: Joi.string().required(),
    STRIPE_SECRET_KEY: Joi.string().required(),
    STRIPE_WEBHOOK_SECRET: Joi.string().required(),
})
    .unknown()
    .required();

// Validate environment variables
const { error, value: envVars } = paymentConfigSchema.validate(process.env, {
    abortEarly: false,
});

Assert(
    !error,
    `paymentConfig validation error: ${error?.message || "Unknown error"}`,
);

// Define the interface for the authentication configuration
interface PaymentConfig extends InterfaceBaseConfig {
    STRIPE_PUBLISHABLE_KEY: string;
    STRIPE_SECRET_KEY: string;
    STRIPE_WEBHOOK_SECRET:string;
}

// Create the configuration object
const paymentConfig: PaymentConfig = {
    STRIPE_PUBLISHABLE_KEY: envVars.STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: envVars.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: envVars.STRIPE_WEBHOOK_SECRET,
    ...BaseConfig,
};

export default Object.freeze(paymentConfig);
