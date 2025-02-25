import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderName: {
      type: String,
      minLength: [2, "Name require atleast two characters."],
    },
    subject: {
      type: String,
      minLength: [2, "Subject require atleast two characters."],
    },
    message: {
      type: String,
      minLength: [2, "Message require atleast two characters."],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamp: true }
);

export const Message = mongoose.model("Message", messageSchema);
