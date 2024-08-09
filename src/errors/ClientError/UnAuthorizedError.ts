import ClientError, {ClientErrorOptions} from "./ClientError";
import {StatusCodes} from "http-status-codes";

export class UnAuthorizedError extends ClientError {
    constructor(options: ClientErrorOptions | undefined = undefined) {
        super({
            statusCode: StatusCodes.UNAUTHORIZED,
            errorType: "UnAuthorizedError",
            message: (options && options.message) || "To continue, please login or signup",
            details: (options && options.details)
        });
    }
}

export default UnAuthorizedError;