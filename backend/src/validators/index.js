import { body } from "express-validator";

// Registration validator
const userRegisterValidator = () => [
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email"),
    body("username")
        .trim()
        .notEmpty().withMessage("Username is required")
        .isLowercase().withMessage("Username must be lowercase")
        .isLength({ min: 4 }).withMessage("Username must be at least 4 characters"),
    body("password")
        .trim()
        .notEmpty().withMessage("Password is required"),
    body("fullName")
        .trim()
        .notEmpty().withMessage("Full name is required"),
];

// Login validator
const userLoginValidator = () => [
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email"),
    body("password")
        .trim()
        .notEmpty().withMessage("Password is required"),
];

// Change current password validator
const userChangeCurrentPasswordValidator = () => [
    body("oldPassword")
        .notEmpty().withMessage("Old password is required"),
    body("newPassword")
        .notEmpty().withMessage("New password is required"),
];

// Forgot password validator
const userForgotPasswordValidator = () => [
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email"),
];

// Reset forgotten password validator
const userResetPasswordValidator = () => [
    body("newPassword")
        .notEmpty().withMessage("New password is required")
        .isLength({ min: 6 }).withMessage("New password must be at least 6 characters"),
];

export {
    userRegisterValidator,
    userLoginValidator,
    userChangeCurrentPasswordValidator,
    userForgotPasswordValidator,
    userResetPasswordValidator,
};