import { Document, Schema, Types, model } from "mongoose";
import { ExerciseModel, IExerciseModel } from "./exercise-model";

export interface ISetModel extends Document {
    exercise: Types.ObjectId | IExerciseModel;
    load: number;
    reps: number;
    comments?: string; // "?" - The user may won't have any comments
}

export const SetSchema = new Schema<ISetModel>({
    exercise: {
        type: Types.ObjectId,
        required: [true, "Please select an exercise from the list"]
    },
    load: {
        type: Number,
        required: [true, "Please select the load."]
    },
    reps: {
        type: Number,
        required: [true, "Please select the number of reps performed."]
    }
},
    {
        versionKey: false,
        toJSON: { virtuals: true }, // Return foreign key in json
        id: false // Don't add an id on top of the _id
    }
);

SetSchema.virtual("exerciseVirtual", {
    ref: ExerciseModel, 
    localField: "name",
    foreignField: "_id",
    justOne: true
});

export const SetModel = model<ISetModel>("SetModel", SetSchema, "sets"); // "sets" = collection name
