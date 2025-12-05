import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// helper to generate JWT
const generateAccessToken = (userId) => {
    console.log("JWT Secret at runtime:", process.env.ACCESS_TOKEN_SECRET);
    return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1h",

    });
};

// REGISTER (Signup)
const registerUser = asyncHandler(async (req, res) => {
    const { email, username, password, fullName } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
        throw new ApiError(409, "User already exists");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
        email,
        username,
        fullName,
        password: hashedPassword,
    });

    // generate token
    const accessToken = generateAccessToken(user._id);

    const safeUser = await User.findById(user._id).select("-password");

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

    const user = await User.findOne({ email });
    if (!user) throw new ApiError(400, "Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ApiError(400, "Invalid credentials");

    const accessToken = generateAccessToken(user._id);

    const safeUser = await User.findById(user._id).select("-password");

    return res.status(200).json(
        new ApiResponse(200, { user: safeUser, accessToken }, "Login successful")
    );
});

// LOGOUT
const logout = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponse(200, {}, "User logged out"));
});

// GET CURRENT USER
const getCurrentUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id).select("-password");
    if (!user) throw new ApiError(404, "User not found");

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Current user fetched"));
});

// CHANGE PASSWORD
const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new ApiError(400, "Wrong password");

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"));
});

export { registerUser, login, logout, getCurrentUser, changeCurrentPassword };