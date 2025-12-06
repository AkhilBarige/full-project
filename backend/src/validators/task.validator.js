import Joi from "joi";

export const taskSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            "string.base": "Title must be a string",
            "string.empty": "Title is required",
            "string.min": "Title must be at least 3 characters long",
            "string.max": "Title cannot exceed 100 characters",
        }),

    description: Joi.string()
        .allow("")
        .messages({
            "string.base": "Description must be a string",
        }),

    status: Joi.string()
        .valid("todo", "in_progress", "done")
        .default("todo")
        .messages({
            "any.only": "Status must be one of: todo, in_progress, done",
        }),

    dueDate: Joi.date()
        .optional()
        .messages({
            "date.base": "Due date must be a valid date",
        }),
});