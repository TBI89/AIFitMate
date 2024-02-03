import { Document, Schema, Types, model } from "mongoose";
import { FoodModel, IFoodModel } from "./food-model";

export interface IFoodLogModel extends Document {
    foodName: Types.ObjectId | IFoodModel;
}

export const FoodLogSchema = new Schema<IFoodLogModel>({
    foodName: {
        type: Types.ObjectId
    }
},
    {
        versionKey: false, // Don't add the version number to the document.
        toJSON: { virtuals: true }, // Return foreign key in JSON.
        id: false // Don't add an id on top of the _id.
    }
);

FoodLogSchema.virtual("foodNameVirtual", {
    ref: FoodModel,
    localField: "name",
    foreignField: "_id",
    justOne: true
});

export const FoodLogModel = model<IFoodLogModel>("FoodLogModel", FoodLogSchema, "food-logs"); // "food-logs" = collection name.

