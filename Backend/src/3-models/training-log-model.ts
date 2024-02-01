import { Document, Schema, Types, model } from "mongoose";
import { ISetModel, SetModel } from "./set-model";

export interface ITrainingLogModel extends Document {
    setsPerExercise: Types.ObjectId | ISetModel;
}

export const TrainingLogSchema = new Schema<ITrainingLogModel>({
    setsPerExercise: {
        type: Types.ObjectId
    }
},
    {
        versionKey: false, // we don't need the version on the document.
        toJSON: {virtuals: true}, // Return foreign key in json
        id: false // we don't need an _id prop on the virtual fields.
    }
);

TrainingLogSchema.virtual("exerciseLogVirtual", {
    ref: SetModel,
    localField: "exercise", 
    foreignField: "_id",
    justOne: true
});

TrainingLogSchema.virtual("loadLogVirtual", {
    ref: SetModel,
    localField: "load", 
    foreignField: "_id",
    justOne: true
});

TrainingLogSchema.virtual("repsLogVirtual", {
    ref: SetModel,
    localField: "reps", 
    foreignField: "_id",
    justOne: true
});

TrainingLogSchema.virtual("commentsLogVirtual", {
    ref: SetModel,
    localField: "comments", 
    foreignField: "_id",
    justOne: true
});

export const TrainingLogModel = model<ITrainingLogModel>("TrainingLogModel", TrainingLogSchema, "training-logs");

