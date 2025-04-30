import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: [
        "Theatrical Production",
        "Research",
        "Workshop",
        "Community Project",
        "Publication",
      ],
      required: true,
    },
    department: { type: String, default: "Dramatics" },
    institution: { type: String, default: "University of Chittagong" },
    description: { type: String, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    status: { type: String, enum: ["Ongoing", "Completed"] },
    role: { type: String },
    collaborators: [{ type: String }],
    media: [
      {
        type: {
          type: String,
          enum: ["image", "video"],
        },
        url: String,
      },
    ],
    tags: [{ type: String }],
    location: { type: String },
    audience: { type: String },
    impact: { type: String },
    projectBanner: {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
