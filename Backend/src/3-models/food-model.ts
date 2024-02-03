import { Document, Schema, Types, model } from "mongoose";
import { FoodTypeModel, IFoodTypeModel } from "./food-type-model";


export interface IFoodModel extends Document {
    name: string;
    type: Types.ObjectId | IFoodTypeModel;
    servingSizeInGrams: number;
    caloriesPerServing: number;
    proteinPerSering: number;
    carbohydratePerServing: number;
    fatPerServing: number;
}

export const FoodSchema = new Schema<IFoodModel>({
    name: {
        required: [true, "Please provide the food's name."],
        minlength: [3, "Food name must contain at least 3 characters."],
        maxlength: [30, "Food name can't contain more then 30 characters."],
        match: [/^[A-Za-z]+$/, "Only letters are allowed in the first name."]
    },
    type: {
        type: Types.ObjectId,
        required: [true, "Please select the food's type from the list."]
    },
    caloriesPerServing: {
        type: Number,
        required: [true, "Please provide the number of calories for that food."]
    },
    proteinPerSering: {
        type: Number,
        required: [true, "Please provide the amount of protein for that food."]
    },
    carbohydratePerServing: {
        type: Number,
        required: [true, "Please provide the amount of carbohydrates for that food."]
    },
    fatPerServing: {
        type: Number,
        required: [true, "Please provide the number of fat for that food."]
    }
},
    {
        versionKey: false,
        toJSON: { virtuals: true }, // Return foreign key in json
        id: false // Don't add an id on top of the _id
    }
);

FoodSchema.virtual("typeVirtual", {
    ref: FoodTypeModel,
    localField: "name",
    foreignField: "_id",
    justOne: true
});

export const FoodModel = model<IFoodModel>("FoodModel", FoodSchema, "foods"); // "foods" = collection name

