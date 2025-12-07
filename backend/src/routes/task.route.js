import { Router } from "express";
import { body } from "express-validator";
import {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
} from "../controllers/task.controllers.js";
import { verifyJWT } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = Router();

//  All task routes require authentication
router.use(verifyJWT);

//  Create task
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
        body("status")
            .optional()
            .isIn(["todo", "in_progress", "done"])
            .withMessage("Status must be one of: todo, in_progress, done"),
        body("dueDate")
            .optional()
            .isISO8601()
            .toDate()
            .withMessage("Due date must be a valid date"),
    ],
    validate,
    createTask
);

//  Get all tasks
router.get("/", getTasks);

//  Update task by ID
router.put(
    "/:id",
    [
        body("title")
            .optional()
            .isString()
            .withMessage("Title must be a string"),
        body("description")
            .optional()
            .isString()
            .withMessage("Description must be a string"),
        body("status")
            .optional()
            .isIn(["todo", "in_progress", "done"])
            .withMessage("Status must be one of: todo, in_progress, done"),
        body("dueDate")
            .optional()
            .isISO8601()
            .toDate()
            .withMessage("Due date must be a valid date"),
    ],
    validate,
    updateTask
);

//  Delete task by ID
router.delete("/:id", deleteTask);

export default router;