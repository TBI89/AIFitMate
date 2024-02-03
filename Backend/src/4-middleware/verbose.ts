import { Request, Response, NextFunction } from "express";
import { json } from "stream/consumers";
import logger from "../2-utils/logger";

function verbose(request: Request, response: Response, next: NextFunction) {

    const userActivities =
        `
    User IP: ${request.ip}
    Method: ${request.method}
    URL: ${request.originalUrl}
    Body: ${JSON.stringify(request.body)}
    `
    logger.logActivity(userActivities);

    next();
}

export default verbose;