import { UnauthorizedError } from "../3-models/client-errors";
import { IUserModel } from "../3-models/user-model";
import JWT from "jsonwebtoken";
import crypto from "crypto";

const tokenSecretKey = process.env.TOKEN_SECRET_KEY;

function getNewToken(user: IUserModel): string {
    delete user.password;
    const container = { user };
    const options = { expiresIn: "5h" };
    const token = JWT.sign(container, tokenSecretKey, options); // The order matters here!
    return token;
}

function verifyToken(token: string): void {
    if (!token) throw new UnauthorizedError("Please login first.");
    try {
        JWT.verify(token, tokenSecretKey);
    }
    catch (err: any) {
        throw new UnauthorizedError(err.message);
    }
}

// String that will be added to the user's password saved on the db for security reasons:
const hashSalt = process.env.HASH_SALT;

function hashedPassword(userPassword: string): string {
    if (!userPassword) return null;
    const hashedSaltedPassword = crypto.createHmac("sha512", hashSalt).update(userPassword).digest("hex");
    return hashedSaltedPassword;
}

export default {
    getNewToken,
    verifyToken,
    hashedPassword
}