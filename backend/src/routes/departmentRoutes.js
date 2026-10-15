import { Router } from "express";
import { listDepartments, createDepartment, updateDepartment } from "../controllers/departmentController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

router.use(protect);

router
  .route("/")
  .get(listDepartments)
  .post(authorize("Admin"), createDepartment);

router.put("/:id", authorize("Admin"), updateDepartment);

export default router;
