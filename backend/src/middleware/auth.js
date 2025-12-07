import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

export const verifyJWT = asyncHandler(async (req, _res, next) => {
    // Extract token from cookie or Authorization header
    const rawAuthHeader = req.header("Authorization");
    const token =
        req.cookies?.accessToken ||
        (rawAuthHeader && rawAuthHeader.startsWith("Bearer ")
            ? rawAuthHeader.replace("Bearer ", "").trim()
            : null);

    if (!token) {
        throw new ApiError(401, "Unauthorized request: No token provided");
    }

    try {
        // Verify token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (!decodedToken || !decodedToken._id) {
            throw new ApiError(401, "Invalid token payload");
        }

        // Check if user still exists
        const userExists = await User.exists({ _id: decodedToken._id });
        if (!userExists) {
            throw new ApiError(401, "Unauthorized user access: User not found");
        }

        // Attach only the user ID to request
        req.user = { _id: decodedToken._id };

        next();
    } catch (error) {
        console.error("JWT verification failed:", error.message);
        throw new ApiError(401, "Unauthorized user access: Invalid or expired token");
    }
});