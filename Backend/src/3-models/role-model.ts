import { Document, Schema, model } from "mongoose";

const user = 1;
const admin = 2;

export interface IRoleModel extends Document {
    role: number;
}

export const RoleSchema = new Schema<IRoleModel>({
    role: {
        type: Number,
        enum: [user, admin],
        default: user // Default role.
    }
},
    {
        versionKey: false // Don't add the version to the document structure.
    }
);

export const RoleModel = model<IRoleModel>("RoleModel", RoleSchema, "roles"); // "roles" = collection name.
