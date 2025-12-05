import { Router } from "express";
import {
    registerUser,
    login,
    logout,
    getCurrentUser,
    changeCurrentPassword,
} from "../controllers/auth.controller.js";

import { validate } from "../middlewares/validator.middleware.js";
import {
    userRegisterValidator,
    userLoginValidator,
    userChangeCurrentPasswordValidator,
} from "../validators/index.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Public routes
router.post("/signup", userRegisterValidator(), validate, registerUser); // match frontend
router.post("/login", userLoginValidator(), validate, login);

// Secure routes
router.post("/logout", verifyJWT, logout);
router.get("/current-user", verifyJWT, getCurrentUser); // GET instead of POST
router.post(
    "/change-password",
    verifyJWT,
    userChangeCurrentPasswordValidator(),
    validate,
    changeCurrentPassword
);

export default router;