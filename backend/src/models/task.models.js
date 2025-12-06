import mongoose, { Schema } from "mongoose";
import { TaskStatusEnum, AvailableTaskStatus } from "../utils/constants.js";

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: AvailableTaskStatus, // ✅ enforce status values from constants
            default: TaskStatusEnum.TODO,
        },
        dueDate: {
            type: Date,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true, // ✅ faster queries by user
        },
    },
    { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);