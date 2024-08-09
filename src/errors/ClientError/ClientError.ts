import {BaseError, BaseErrorOptions} from "../BaseError/BaseError";

export interface ClientErrorOptions {
    message?: string;
    details?: any[]
}

export abstract class ClientError extends BaseError{
    protected constructor(options: BaseErrorOptions) {
        super(options);
    }
}

export default ClientError;