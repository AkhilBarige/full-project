import { Router } from "express";
import { healthcheck } from "../controllers/healthcheck.controllers.js"; // ✅ plural consistency

const router = Router();

//  Healthcheck route
router.get("/", healthcheck);

export default router;