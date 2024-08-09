import { RequestHandler } from "express";
import UnAuthorizedError from "../errors/ClientError/UnAuthorizedError";

const isAuthenticatedMiddleware: RequestHandler = (req, _, next) => {
    if(req.isAuthenticated() && req.user){
        next()
    }else{
        next(new UnAuthorizedError({message: "Unauthorized access. Please log in to continue."}))
    }
}

export default isAuthenticatedMiddleware;