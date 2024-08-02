import Joi from 'joi';

// Define the schema for login validation
export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});


export const signupSchema = Joi.object({
    firstName: Joi.string().min(1).max(32).required(),
    lastName: Joi.string().min(1).max(32).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});