import { body } from "express-validator"



const userRegisterValidator = () => {
    return [
        body("email").trim().notEmpty().withMessage("email is required").isEmail().withMessage("invalid mail"),
        body("username").trim().notEmpty().withMessage("username is required").isLowercase().withMessage("invalid username").isLength({ min: 4 }).withMessage("at 4 char is must"),
        body("password").trim().notEmpty().withMessage("password is required"),
        body("fullName").trim().notEmpty().withMessage("fullName is required"),
    ]
}

const userLoginValidator = () => {
    return [
        body("email").trim().optional().isEmail().withMessage("invalid mail"),
        ,
        body("password").trim().notEmpty().withMessage("password is required"),

    ]
}

const userChangeCurrentPasswordValidator = () => {
    return [
        body("oldPassword").notEmpty().withMessage("pass req"),
        body("newPassword").notEmpty().withMessage("pass req"),
    ]
}
const userForgotPasswordValidator = () => {
    return [
        body("email").notEmpty().withMessage("email req").isEmail().withMessage("invalid email"),

    ]
}
const userResetForgotPasswordValidator = () => {
    return [

        body("newPassword").notEmpty().withMessage("pass req"),
    ]
}

export { userRegisterValidator, userLoginValidator, userResetForgotPasswordValidator, userForgotPasswordValidator, userChangeCurrentPasswordValidator }