import express from "express";
import {
  addResearch,
  getAllResearch,
  getSingleResearch,
  deleteResearch,
} from "../controllers/researchController.js";
import { authHandler } from "../middlewares/authHandler.js";

const router = express.Router();

router.post("/add", authHandler, addResearch);
router.get("/getall", getAllResearch);
router.get("/get/:id", getSingleResearch);
router.delete("/delete/:id", authHandler, deleteResearch);

export default router;
