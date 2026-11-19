import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
  validateTaskId,
} from "../controllers/taskController.js";

const router = Router();

router.route("/").get(getTasks).post(createTask);
router.route("/:id")
  .all(validateTaskId)
  .get(getTask)
  .put(updateTask)
  .delete(deleteTask);

export default router;
