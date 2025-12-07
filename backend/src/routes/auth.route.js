import { Router } from "express";
import {
    registerUser,
    login,
    logout,
    getCurrentUser,
    changeCurrentPassword,
} from "../controllers/auth.controllers.js";

import { validate } from "../middleware/validate.js";
import {
    userRegisterValidator,
    userLoginValidator,
    userChangeCurrentPasswordValidator,
} from "../validators/index.js";

import { verifyJWT } from "../middleware/auth.js";

const router = Router();

// Public routes
router.post("/signup", userRegisterValidator(), validate, registerUser);
router.post("/login", userLoginValidator(), validate, login);

//  Secure routes
router.post("/logout", verifyJWT, logout);
router.get("/profile", verifyJWT, getCurrentUser);
router.post(
    "/change-password",
    verifyJWT,
    userChangeCurrentPasswordValidator(),
    validate,
    changeCurrentPassword
);

export default router;