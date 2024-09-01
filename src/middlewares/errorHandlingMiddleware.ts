import {ErrorRequestHandler} from "express";
import {StatusCodes} from "http-status-codes";
import {MulterError} from "multer";
import ValidationError from "../errors/ClientError/ValidationError";
import ClientError from "../errors/ClientError/ClientError";

const bodyParserCommonErrorsTypes = [
    "encoding.unsupported",
    "entity.parse.failed",
    "entity.verify.failed",
    "request.aborted",
    "request.size.invalid",
    "stream.encoding.set",
    "parameters.too.many",
    "charset.unsupported",
    "entity.too.large",
];
function isBodyParserError(error: any) {
    return bodyParserCommonErrorsTypes.includes(error.type);
}


const errorHandlingMiddleware:ErrorRequestHandler = (err , __ , res , _ ) => {
    console.error("ErrorHandlingMiddleware: ", err)
    if(err instanceof MulterError){
        if(err.code === "LIMIT_FILE_SIZE"){
            err = new ValidationError({
                message: "File size has exceeded the limit, please reduce the file size or use different file.",
                details: [{
                    "message": "Maximum file size allowed is 5MB."
                }]
            })
        }else if(err.code === "LIMIT_PART_COUNT"){
            err = new ValidationError({
                message: "Too many files uploaded"
            })
        }else if(err.code === "LIMIT_FIELD_COUNT"){
            err = new ValidationError({
                message: "The field for file is not supported"
            })
        }else{
            err = new ValidationError({
                message: "error in validating the file"
            })
        }
    }
    if(isBodyParserError(err)){
        console.log(err.expose)
        console.log(err.message)
        console.log(err.body)
        return res.status(err.statusCode).json({
            error: err.type,
            message: err.expose ? err.message : "Something went wrong with parsing your payload! Please try again later.",
            details: []
        })
    }

    if (!(err instanceof ClientError)) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'InternalServerError',
            message: 'An unexpected error occurred',
            details: [],
        });
    }
    return res.status(err.statusCode).json(err);
}

export default errorHandlingMiddleware;