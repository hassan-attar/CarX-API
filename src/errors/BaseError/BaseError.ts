import {getReasonPhrase, StatusCodes} from "http-status-codes";

export interface BaseErrorOptions {
    errorType: string;
    message?: string;
    details?: any[];
    statusCode?: StatusCodes;
}

export abstract class BaseError extends Error {
    public statusCode: StatusCodes;
    public errorType: string;
    public details: any[];

    protected constructor(options: BaseErrorOptions) {
        super(options.message || getReasonPhrase(options.statusCode || StatusCodes.INTERNAL_SERVER_ERROR));
        this.statusCode = options.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        this.errorType = options.errorType || this.constructor.name;
        this.details = options.details || [];
        Error.captureStackTrace(this, this.constructor);
    }
    toJSON(){
        return {
            error: this.errorType,
            message: this.message,
            details: this.details.length ? this.details : null,
        };
    }
}



