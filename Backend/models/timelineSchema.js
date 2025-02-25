import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    timeline: {
      from: String,
      to: String,
    },
  },
  { timestamp: true }
);

export const Timeline = mongoose.model("Timeline", timelineSchema);
