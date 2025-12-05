import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    // Extract token
    console.log("Authorization header raw:", req.headers);
    const rawAuthHeader = req.header("Authorization");
    const token =
        req.cookies?.accessToken ||
        (rawAuthHeader && rawAuthHeader.startsWith("Bearer ")
            ? rawAuthHeader.replace("Bearer ", "").trim()
            : null);

    console.log("Authorization header:", rawAuthHeader);
    console.log("Raw token received:", token);

    if (!token) {
        throw new ApiError(401, "Unauthorized request: No token provided");
    }

    try {
        // Verify token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log("JWT Secret at runtime:", process.env.ACCESS_TOKEN_SECRET);
        console.log("Decoded token:", decodedToken);


        const user = await User.findById(decodedToken.id).select("-password");
        console.log("User found:", user);
        if (!user) {
            throw new ApiError(401, "Unauthorized user access: User not found");
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("JWT verification failed:", error.message, "Token:", token);
        throw new ApiError(401, "Unauthorized user access: Invalid token");
    }
});