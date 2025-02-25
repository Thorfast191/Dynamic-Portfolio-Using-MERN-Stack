import { User } from "../models/userSchema.js";
import { asyncHandler } from "./asyncHandler.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const authHandler = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("User not authenticated!", 401));
  } // Check if user is authenticated

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return next(new ErrorHandler("User not found", 404));
    }

    next();
  } catch (error) {
    return next(new ErrorHandler("Json Web Token is invalid, Try again!", 400));
  }
});
