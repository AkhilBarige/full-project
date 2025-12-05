import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use(
    cors({
        origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:3000",
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Authorization", "Content-Type"],
    })
);

// routes
import healthcheckrouter from "./routes/healthcheck.route.js";
import authrouter from "./routes/auth.route.js";
import taskRoutes from "./routes/task.route.js";

app.use("/api/v1/healthcheck", healthcheckrouter);
app.use("/api/v1/auth", authrouter);
app.use("/api/v1/tasks", taskRoutes);

// test routes
app.get("/", (req, res) => {
    res.send("hello man!");
});
app.get("/look", (req, res) => {
    res.send("we are here already");
});

export default app;