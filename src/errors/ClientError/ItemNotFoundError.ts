import ClientError, {ClientErrorOptions} from "./ClientError";
import {StatusCodes} from "http-status-codes";

export class ItemNotFoundError extends ClientError {
    constructor(options: ClientErrorOptions | undefined = undefined) {
        super({
            statusCode: StatusCodes.NOT_FOUND,
            errorType: ItemNotFoundError.name,
            message: (options && options.message) || "Item not found.",
            details: (options && options.details)
        });
    }
}

export default ItemNotFoundError;