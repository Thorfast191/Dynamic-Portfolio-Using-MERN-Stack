import express from "express";
import {
  addNewPublication,
  deletePublication,
  getAllPublications,
  getSinglePublication,
  updatePublication,
} from "../controllers/publicationController.js";
import { authHandler } from "../middlewares/authHandler.js";

const router = express.Router();

router.post("/add", authHandler, addNewPublication);
router.delete("/delete/:id", authHandler, deletePublication);
router.put("/update/:id", authHandler, updatePublication);
router.get("/getall", getAllPublications);
router.get("/get/:id", getSinglePublication);

export default router;
