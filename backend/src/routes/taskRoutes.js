import { Router } from "express";
import { listTasks, getTask, createTask, updateTask, addComment, deleteTask } from "../controllers/taskController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = Router();

router.use(protect);

router
  .route("/")
  .get(listTasks)
  .post(authorize("Admin", "Manager"), createTask);

router
  .route("/:id")
  .get(getTask)
  .put(updateTask)
  .delete(authorize("Admin", "Manager"), deleteTask);

router.post("/:id/comments", addComment);

export default router;
