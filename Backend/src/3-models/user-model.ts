import { Document, Schema, model } from "mongoose";
import { IRoleModel } from "./role-model";

export interface IUserModel extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: IRoleModel;
}

export const UserSchema = new Schema<IUserModel>({

    firstName: {
        type: String,
        required: [true, "Please enter your first name."],
        minlength: [2, "First name should contain at least 2 characters."],
        maxlength: [20, "First name can't contain more than 20 characters."],
        trim: true, // Remove leading and trailing whitespaces
        match: [/^[A-Za-z]+$/, "Only letters are allowed in the first name."],
    },
    lastName: {
        type: String,
        required: [true, "Please enter your last name."],
        minlength: [2, "Last name should contain at least 2 characters."],
        maxlength: [20, "Last name can't contain more than 20 characters."],
        trim: true, // Remove leading and trailing whitespaces
        match: [/^[A-Za-z]+$/, "Only letters are allowed in the last name."],
    },
    email: {
        type: String,
        required: [true, "Please enter your email address."],
        unique: true, // Ensure email is unique
        lowercase: true, // Convert email to lowercase
        match: [
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            "Please enter a valid email address."
        ],
    },
    password: {
        type: String,
        required: [true, "Please enter your password."],
        minlength: [8, "Password should contain at least 8 characters."],
        // Validation for a strong password (at least 1 uppercase and 1 special char)
        validate: {
            validator: (value: string) => /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/.test(value),
            message: 'Password should contain at least 1 uppercase letter and 1 special character.'
        }
    }
},
    {
        versionKey: false // Don't that the versionKey value to the document structure.
    }
);

export const UserModel = model<IUserModel>("UserModel", UserSchema, "users"); // "users" = collection name

