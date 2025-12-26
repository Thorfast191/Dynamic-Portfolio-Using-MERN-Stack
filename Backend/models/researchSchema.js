import mongoose from "mongoose";

const researchSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    paperId: {
      type: String,
    },

    platform: {
      type: String, // arXiv, IEEE, Springer, GitHub, etc.
    },

    program: {
      type: String, // MSc Thesis, Independent Research, Grant Project
    },

    status: {
      type: String,
      enum: ["Published", "Ongoing", "Hold", "Cancelled"],
      default: "Ongoing",
    },

    paperAttachment: {
      public_id: String,
      url: String,
    },

    codeAttachment: {
      public_id: String,
      url: String,
      fileType: String, // ipynb, py, js, zip
    },

    images: [
      {
        public_id: String,
        url: String,
      },
    ],
  },
  { timestamps: true }
);

export const Research = mongoose.model("Research", researchSchema);
