import { Request, Response, NextFunction } from "express";
import stripTags from "striptags";

function sanitize(request: Request, response: Response, next: NextFunction) {
    for (const prop in request.body) { // Iterate in the request body object.
        if (typeof request.body[prop] === "string") { // Check for sting values in it.
            request.body[prop] = stripTags(request.body[prop]); // Strip HTML tags from them. 
        }
    }
    next();
}

export default sanitize;