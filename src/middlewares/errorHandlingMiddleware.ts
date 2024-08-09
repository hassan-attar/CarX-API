import {ErrorRequestHandler} from "express";
import {BaseError} from "../errors/BaseError/BaseError";
import ClientError from "../errors/ClientError/ClientError";
import {StatusCodes} from "http-status-codes";

const errorHandlingMiddleware:ErrorRequestHandler = (err , __ , res , _ ) => {
    if (!(err instanceof BaseError)) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'InternalServerError',
            message: 'An unexpected error occurred',
            details: [],
        });
    }
    if (err instanceof ClientError) {
        return res.json(err);
    }
    return res.status(err.statusCode).json(err);
}

export default errorHandlingMiddleware;