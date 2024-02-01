import { Document, Schema, model } from "mongoose";

// Trainee levels:
const newbie = 1;
const intermediate = 2;
const advanced = 3;

export interface IExerciseModel extends Document {
    name: string;
    muscleGroup: string;
    description: string;
    traineeLevel: number;
}

export const ExerciseSchema = new Schema<IExerciseModel>({
    name: {
        type: String,
        required: [true, "Please provide the exercise's name."],
        minlength: [4, "Exercise name must contain at least 4 characters."],
        maxlength: [16, "Exercise name can't contain more then 16 characters"],
        match: [/^[A-Za-z]+$/, "Only letters are allowed in the exercise name."]
    },
    muscleGroup: {
        type: String,
        required: [true, "Please provide the muscle group's name."],
        minlength: [4, "Muscle group name must contain at least 4 characters."],
        maxlength: [16, "Muscle group name can't contain more then 16 characters"],
        match: [/^[A-Za-z]+$/, "Only letters are allowed in the muscle group name."]
    },
    description: {
        type: String,
        required: [true, "Please provide the exercise's description."],
        minlength: [30, "Description must contain at least 30 characters."],
        maxlength: [300, "Description can't contain more then 300 characters"]
    },
    traineeLevel: {
        type: Number,
        required: [true, "Please select the appropriate trainee's lever for this exercise."],
        enum: [newbie, intermediate, advanced]
    }

},
    {
        versionKey: false
    }
);

export const ExerciseModel = model<IExerciseModel>("ExerciseModel", ExerciseSchema, "exercises"); // "exercises = collection name"