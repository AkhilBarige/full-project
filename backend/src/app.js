import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { ApiError } from "./utils/api-error.js";

// Initialize app
const app = express();

// 🔒 Security best practices
app.use(helmet()); // adds secure headers
app.disable("x-powered-by"); // removes "X-Powered-By" header

// 📦 Middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// 🌍 CORS setup
const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || ["http://localhost:3000"];
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Authorization", "Content-Type"],
    })
);

// Handle preflight requests
app.options("/", cors());

// 🗄️ Cache control middleware (example: 1 hour for static assets)
app.use((req, res, next) => {
    res.setHeader("Cache-Control", "public, max-age=3600");
    next();
});

// 🚦 Routes
import healthcheckRouter from "./routes/healthcheck.route.js";
import authRouter from "./routes/auth.route.js";
import taskRouter from "./routes/task.route.js";

app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", taskRouter);

// Simple test routes
app.get("/", (_req, res) => res.send("Hello, Task Manager API is running!"));
app.get("/look", (_req, res) => res.send("We are here already"));

// ❌ Error handling middleware
app.use((err, _req, res, _next) => {
    console.error("Error:", err);

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            statusCode: err.statusCode,
            message: err.message,
            success: false,
        });
    }

    res.status(500).json({
        statusCode: 500,
        message: "Internal Server Error",
        success: false,
    });
});

export default app;