import express from "express";
import {
  forgotPassword,
  getPortfolio,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updatePassword,
  updateUserProfile,
} from "../controllers/userController.js";
import { authHandler } from "../middlewares/authHandler.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", authHandler, logoutUser);
router.get("/me", authHandler, getUser);
router.put("/update/me", authHandler, updateUserProfile);
router.put("/update/password", authHandler, updatePassword);
router.get("/me/portfolio", getPortfolio);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);

export default router;
