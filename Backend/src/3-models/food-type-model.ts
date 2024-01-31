import { Document, Schema, model } from "mongoose";

export interface IFoodTypeModel extends Document {
    name: string;
}

const FoodTypeSchema = new Schema<IFoodTypeModel>({
    name: {
        type: String,
        required: [true, "Please provide the food's type name."],
        minlength: [3, "Food type's name must contain at least 3 characters."],
        maxlength: [30, "Food type can't contain more then 30 characters."],
        match: [/^[A-Za-z]+$/, "Only letters are allowed in the first name."]
    }
});

export const FoodTypeModel = model<IFoodTypeModel>("FoodTypeModel", FoodTypeSchema, "food-types"); // "food-types" = collection name