import { NextFunction, Request, Response } from "express";
import StatusCode from "../3-models/status-code";
import appConfig from "../2-utils/app-config";
import logger from "../2-utils/logger";

function catchAll(err: any, request: Request, response: Response, next: NextFunction) {
    const status = err.status || StatusCode.InternalServerError;
    const isCrash = status >= 500 && status <= 599;
    const message = isCrash && appConfig.isProduction ? "Some error, please try again later" : err.message;
    console.log(err.message);
    logger.logError(err.message, err); // Log both the message, and the whole error object.
    response.status(status).send(message); // Response to the frontend.
}

export default catchAll;
