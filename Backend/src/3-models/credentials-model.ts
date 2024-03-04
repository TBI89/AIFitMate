import { Document, Schema, model } from "mongoose";

export interface ICredentialsModel extends Document {
    email: string,
    password: string
}

export const CredentialsSchema = new Schema<ICredentialsModel>({

    email: {
        type: String,
        required: [true, "Please enter your email address."]
    },
    password: {
        type: String,
        required: [true, "Please enter your password."]
    }
},
    {
        versionKey: false
    }
);

export const CredentialsModel = model<ICredentialsModel>("CredentialsModel", CredentialsSchema, "credentials");