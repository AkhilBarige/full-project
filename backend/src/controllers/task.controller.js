import { Task } from "../models/task.models.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

// Create task
export const createTask = asyncHandler(async (req, res) => {
    const task = await Task.create({ ...req.body, user: req.user._id });
    res.status(201).json(new ApiResponse(201, task, "Task created"));
});

// Get all tasks for logged-in user
export const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ user: req.user._id });
    res.status(200).json(new ApiResponse(200, tasks));
});

// Update task by ID
export const updateTask = asyncHandler(async (req, res) => {
    const task = await Task.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        req.body,
        { new: true }
    );
    if (!task) throw new ApiError(404, "Task not found");
    res.status(200).json(new ApiResponse(200, task, "Task updated"));
});

// Delete task by ID
export const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!task) throw new ApiError(404, "Task not found");
    res.status(200).json(new ApiResponse(200, task, "Task deleted"));
});