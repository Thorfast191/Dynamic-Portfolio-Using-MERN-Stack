import { User } from "../models/userSchema.js";
import { asyncHandler } from "./asyncHandler.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const authHandler = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User not Authenticated!", 400));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  next();
});
