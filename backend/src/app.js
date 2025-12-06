import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

const app = express();

// ✅ Security best practices
app.use(helmet()); // adds X-Content-Type-Options, etc.
app.disable("x-powered-by"); // removes "X-Powered-By" header

// ✅ Middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// ✅ CORS setup
const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || ["http://localhost:3000"];
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Authorization", "Content-Type"],
    })
);

// ✅ Handle preflight requests properly
app.options(/.*/, cors());


// ✅ Cache control middleware (example: 1 hour for static assets)
app.use((req, res, next) => {
    res.setHeader("Cache-Control", "public, max-age=3600");
    next();
});

// ✅ Routes
import healthcheckrouter from "./routes/healthcheck.route.js";
import authrouter from "./routes/auth.route.js";
import taskRoutes from "./routes/task.route.js";

app.use("/api/v1/healthcheck", healthcheckrouter);
app.use("/api/v1/auth", authrouter);
app.use("/api/v1/tasks", taskRoutes);

app.get("/", (req, res) => {
    res.send("hello man!");
});
app.get("/look", (req, res) => {
    res.send("we are here already");
});

// ✅ Error handling
import { ApiError } from "./utils/api-error.js";

app.use((err, req, res, next) => {
    console.error(err);

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            statuscode: err.statusCode,
            message: err.message,
            success: false,
        });
    }

    res.status(500).json({
        statuscode: 500,
        message: "Internal Server Error",
        success: false,
    });
});

export default app;