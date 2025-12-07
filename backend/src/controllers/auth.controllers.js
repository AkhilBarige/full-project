import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Generate JWT
const generateAccessToken = (user) => {
    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new ApiError(500, "JWT secret not configured");
    }
    return jwt.sign(
        { _id: user._id, email: user.email, username: user.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1h" }
    );
};

// REGISTER (Signup)
const registerUser = asyncHandler(async (req, res) => {
    const { email, username, password, fullName } = req.body;

    if (!email || !username || !password || !fullName) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
        throw new ApiError(409, "User already exists");
    }

    const user = await User.create({
        email,
        username,
        fullName,
        password, // hashed by pre-save hook
    });

    const accessToken = generateAccessToken(user);

    const safeUser = {
        _id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
    };

    return res.status(201).json(
        new ApiResponse(
            201,
            { user: safeUser, accessToken },
            "User registered successfully"
        )
    );
});

// LOGIN
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new ApiError(404, "User not found");

    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
        throw new ApiError(401, "Invalid password");
    }

    const accessToken = generateAccessToken(user);

    const safeUser = {
        _id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
    };

    return res.status(200).json(
        new ApiResponse(200, { user: safeUser, accessToken }, "Login successful")
    );
});

// LOGOUT
const logout = asyncHandler(async (_req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});

// GET CURRENT USER
const getCurrentUser = asyncHandler(async (req, res) => {
    if (!req.user || !req.user._id) {
        throw new ApiError(401, "Unauthorized");
    }

    const user = await User.findById(req.user._id).select("-password");
    if (!user) throw new ApiError(404, "User not found");

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Current user fetched successfully"));
});

// CHANGE PASSWORD
const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        throw new ApiError(400, "Both old and new passwords are required");
    }

    if (!req.user || !req.user._id) {
        throw new ApiError(401, "Unauthorized");
    }

    const user = await User.findById(req.user._id).select("+password");
    if (!user) throw new ApiError(404, "User not found");

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new ApiError(400, "Wrong password");

    user.password = newPassword;
    user.passwordUpdatedAt = new Date();
    await user.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            { passwordUpdatedAt: user.passwordUpdatedAt },
            "Password changed successfully"
        )
    );
});

export {
    registerUser,
    login,
    logout,
    getCurrentUser,
    changeCurrentPassword,
};