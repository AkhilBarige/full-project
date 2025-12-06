import { validationResult } from "express-validator";
import { ApiResponse } from "../utils/api-response.js";

export const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    // Collect errors in a structured way
    const extractedErrors = errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
    }));

    // Respond with 400 Bad Request
    return res.status(400).json(
        new ApiResponse(400, extractedErrors, "Validation failed")
    );
};