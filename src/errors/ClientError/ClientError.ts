import {BaseError, BaseErrorOptions} from "../BaseError/BaseError";

export interface ClientErrorOptions {
    errorType?: string;
    message?: string;
    details?: any[]
}

export class ClientError extends BaseError{
    constructor(options: BaseErrorOptions) {
        super(options);
    }
}

export default ClientError;