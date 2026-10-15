import { Router } from "express";
import { listActivity } from "../controllers/activityController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

router.get("/", protect, authorize("Admin", "Manager"), listActivity);

export default router;
