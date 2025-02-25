import express from "express";
import {
  addSoftApplications,
  deleteSoftApplications,
  getSoftApplications,
} from "../controllers/softwareAppllicationsController.js";
import { authHandler } from "../middlewares/authHandler.js";

const router = express.Router();

router.post("/add", authHandler, addSoftApplications);
router.delete("/delete/:id", authHandler, deleteSoftApplications);
router.get("/get", getSoftApplications);

export default router;
