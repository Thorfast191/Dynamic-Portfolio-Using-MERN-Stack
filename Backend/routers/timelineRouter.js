import express from "express";
import {
  post,
  updatePost,
  deletePost,
  getPost,
} from "../controllers/timelineController.js";
import { authHandler } from "../middlewares/authHandler.js";

const router = express.Router();

router.post("/post", authHandler, post);
router.put("/update/post/:id", authHandler, updatePost);
router.delete("/delete/post/:id", authHandler, deletePost);
router.get("/get/posts", getPost);

export default router;
