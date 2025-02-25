import express from "express";
import {
  deleteMessage,
  getAllMessages,
  sendMessage,
} from "../controllers/messageController.js";
import { authHandler } from "../middlewares/authHandler.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/getMessages", getAllMessages);
router.delete("/deleteMessage/:id", authHandler, deleteMessage);

export default router;
