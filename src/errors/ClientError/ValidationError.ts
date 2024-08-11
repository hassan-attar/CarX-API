import {StatusCodes} from "http-status-codes";
import ClientError, {ClientErrorOptions} from "./ClientError";

export class ValidationError extends ClientError {
    constructor(option: ClientErrorOptions | undefined = undefined) {
        super({
            statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
            errorType: option?.errorType || ValidationError.name,
            message: option?.message || "Validation error",
            details: option?.details
        });
    }
}

export default ValidationError;