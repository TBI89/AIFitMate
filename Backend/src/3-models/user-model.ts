import { Document, Schema, model } from "mongoose";

export interface IUserModel extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const UserSchema = new Schema<IUserModel>({

    firstName: {
        type: String,
        required: [true, "Please enter your first name."],
        minlength: [2, "First name should contain at least 2 characters."],
        maxlength: [20, "First name can't contain more than 20 characters."],
    },
    lastName: {
        type: String,
        required: [true, "Please enter your last name."],
        minlength: [2, "Last name should contain at least 2 characters."],
        maxlength: [20, "Last name can't contain more than 20 characters."],
    },
    email: {
        type: String,
        required: [true, "Please enter your email address."],
    },
    password: {
        type: String,
        required: [true, "Please enter your password."],
        minlength: [8, "Password should contain at least 8 characters."],
    }
},
    {
        versionKey: false 
    }
);

export const UserModel = model<IUserModel>("UserModel", UserSchema, "users"); 