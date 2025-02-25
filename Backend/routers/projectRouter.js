import express from "express";
import {
  addNewProject,
  deleteProject,
  getAllProjects,
  getSingleProject,
  updateProject,
} from "../controllers/projectController.js";
import { authHandler } from "../middlewares/authHandler.js";

const router = express.Router();

router.post("/add", authHandler, addNewProject);
router.delete("/delete/:id", authHandler, deleteProject);
router.put("/update/:id", authHandler, updateProject);
router.get("/getall", getAllProjects);
router.get("/get/:id", getSingleProject);

export default router;
