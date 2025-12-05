import express from "express";
import { body } from "express-validator";
import {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
} from "../controllers/task.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";

const router = express.Router();

router.use(verifyJWT);

// Create task
router.post(
    "/",
    [
        body("title")
            .isString()
            .withMessage("Title must be a string")
            .isLength({ min: 3 })
            .withMessage("Title must be at least 3 characters long"),
        body("description")
            .optional()
            .isString()
            .withMessage("Description must be a string"),
    ],
    validate,
    createTask
);

// Get all tasks
router.get("/", getTasks);

// Update task by ID
router.put("/:id", updateTask);

// Delete task by ID
router.delete("/:id", deleteTask);

export default router;