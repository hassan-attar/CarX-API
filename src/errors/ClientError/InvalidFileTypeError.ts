import ValidationError from "./ValidationError";
import {ClientErrorOptions} from "./ClientError";

export class InvalidFileTypeError extends ValidationError {
    constructor(options: ClientErrorOptions | undefined = undefined) {
        super({
            errorType: InvalidFileTypeError.name,
            message: "Invalid file type, please upload a supported format.",
            details: options?.details
        });
    }
}

export default InvalidFileTypeError;