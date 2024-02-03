import { Request, Response, NextFunction } from "express";
import cyber from "../2-utils/cyber";

// Add headers to the request to extract & verify the token:
function verifyToken(request: Request, response: Response, next: NextFunction) {
    const authHeaders = request.header("authorization");
    const token = authHeaders?.substring(7); // Bearer + space is 7 chars (then the token starts).
    cyber.verifyToken(token);
    next();
}

export default verifyToken;