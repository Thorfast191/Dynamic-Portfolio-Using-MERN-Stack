import { asyncHandler } from "../middlewares/asyncHandler.js";
import ErrorHandler from "../middlewares/error.js";
import { Message } from "../models/messageSchema.js";

// Send Message Controller
export const sendMessage = asyncHandler(async (req, res, next) => {
  const { senderName, subject, message } = req.body;
  if (!senderName || !subject || !message) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  const data = await Message.create({ senderName, subject, message });
  res.status(201).json({
    success: true,
    message: "Message Sent",
    data,
  });
});

// Get All Messages Controller
export const getAllMessages = asyncHandler(async (req, res, next) => {
  const data = await Message.find();
  res.status(200).json({
    success: true,
    data,
  });
});

//Delete Message Controller
export const deleteMessage = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const data = await Message.findByIdAndDelete(id);
  if (!data) {
    return next(new ErrorHandler("Message Not Found!", 404));
  }
  res.status(200).json({
    success: true,
    message: "Message Deleted Successfully.",
    data: data,
  });
});
