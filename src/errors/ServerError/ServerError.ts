import {BaseError} from "../BaseError/BaseError";

export interface ServerErrorOption {
    errorObj: Error | null;
}

abstract class ServerError extends BaseError{
    public errorObj: Error | null;

    protected constructor(options: ServerErrorOption) {
        super({errorType: ServerError.name});
        this.errorObj = options.errorObj;
    }
}

export default ServerError;