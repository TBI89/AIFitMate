import { error } from "console";
import { Document, Schema, model } from "mongoose";
import { ValidationError } from "./client-errors";

export interface IUserModel extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: number;
}

export const UserSchema = new Schema<IUserModel>({

    firstName: {
        type: String,
        required: [true, "Please enter your first name."],
        minlength: [2, "First name should contain at least 2 characters."],
        maxlength: [20, "First name can't contain more than 20 characters."],
        trim: true, // Remove leading and trailing whitespaces.
        match: [/^[A-Za-z]+$/, "Only letters are allowed in the first name."],
    },
    lastName: {
        type: String,
        required: [true, "Please enter your last name."],
        minlength: [2, "Last name should contain at least 2 characters."],
        maxlength: [20, "Last name can't contain more than 20 characters."],
        trim: true, // Remove leading and trailing whitespaces.
        match: [/^[A-Za-z]+$/, "Only letters are allowed in the last name."],
    },
    email: {
        type: String,
        required: [true, "Please enter your email address."],
        unique: true, // Ensure email is unique.
        lowercase: true, // Convert email to lowercase.
        match: [
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            "Please enter a valid email address."
        ],
    },
    password: {
        type: String
    },
    role: {
        type: Number,
        enum: [1, 2], // 1 = user, 2 = admin.
        default: 1
    }
},
    {
        versionKey: false, // Don't add the versionKey value of the document structure.
    }
);

export const UserModel = model<IUserModel>("UserModel", UserSchema, "users"); // "users" = collection name