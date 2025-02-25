import express from "express";
import {
  addSkill,
  updateSkill,
  deleteSkill,
  getSkills,
} from "../controllers/skillController.js";
import { authHandler } from "../middlewares/authHandler.js";

const router = express.Router();

router.post("/add", authHandler, addSkill);
router.put("/update/:id", authHandler, updateSkill);
router.delete("/delete/:id", authHandler, deleteSkill);
router.get("/get", getSkills);

export default router;
