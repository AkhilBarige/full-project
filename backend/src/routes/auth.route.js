import { Router } from "express";
import {
    registerUser,
    login,
    logout,
    getCurrentUser,
    changeCurrentPassword,
} from "../controllers/auth.controllers.js"; // ✅ fixed filename consistency

import { validate } from "../middleware/validate.js"; // ✅ consistent naming
import {
    userRegisterValidator,
    userLoginValidator,
    userChangeCurrentPasswordValidator,
} from "../validators/index.js";

import { verifyJWT } from "../middleware/auth.js"; // ✅ consistent naming

const router = Router();

// 🟢 Public routes
router.post("/signup", userRegisterValidator(), validate, registerUser); // matches frontend
router.post("/login", userLoginValidator(), validate, login);

// 🔒 Secure routes
router.post("/logout", verifyJWT, logout);
router.get("/current-user", verifyJWT, getCurrentUser); // GET is correct for fetching
router.post(
    "/change-password",
    userChangeCurrentPasswordValidator(),
    validate,
    verifyJWT,
    changeCurrentPassword
);

export default router;