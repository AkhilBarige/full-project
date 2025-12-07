import { Task } from "../models/task.models.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

// Create task
export const createTask = asyncHandler(async (req, res) => {
    if (!req.user || !req.user._id) {
        throw new ApiError(401, "Unauthorized");
    }

    const { title, description, status, dueDate } = req.body;
    if (!title) throw new ApiError(400, "Title is required");

    const task = await Task.create({
        title,
        description,
        status,
        dueDate,
        owner: req.user._id, // ✅ always tied to logged-in user
    });

    return res
        .status(201)
        .json(new ApiResponse(201, task, "Task created successfully"));
});

// Get all tasks for logged-in user
export const getTasks = asyncHandler(async (req, res) => {
    if (!req.user || !req.user._id) {
        throw new ApiError(401, "Unauthorized");
    }

    const tasks = await Task.find({ owner: req.user._id }).sort({ createdAt: -1 });
    return res
        .status(200)
        .json(new ApiResponse(200, tasks, "Tasks fetched successfully"));
});

// Update task by ID
export const updateTask = asyncHandler(async (req, res) => {
    if (!req.user || !req.user._id) {
        throw new ApiError(401, "Unauthorized");
    }

    const task = await Task.findOneAndUpdate(
        { _id: req.params.id, owner: req.user._id }, // ✅ scoped to user
        { $set: req.body },
        { new: true }
    );

    if (!task) throw new ApiError(404, "Task not found or not owned by user");

    return res
        .status(200)
        .json(new ApiResponse(200, task, "Task updated successfully"));
});

// Delete task by ID
export const deleteTask = asyncHandler(async (req, res) => {
    if (!req.user || !req.user._id) {
        throw new ApiError(401, "Unauthorized");
    }

    const task = await Task.findOneAndDelete({
        _id: req.params.id,
        owner: req.user._id, // ✅ scoped to user
    });

    if (!task) throw new ApiError(404, "Task not found or not owned by user");

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Task deleted successfully"));
});