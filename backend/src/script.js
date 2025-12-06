import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";

// Load environment variables
dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDB();
        console.log("✅ Database connected successfully");

        // Start Express server
        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("❌ Database connection failed:", err.message);
        process.exit(1);
    }
};

startServer();