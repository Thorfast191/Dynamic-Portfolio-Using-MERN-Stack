import mongoose from "mongoose";

const publicationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    paperId: {
      type: String,
      default: "",
    },
    platform: {
      type: String,
      default: "",
    },
    program: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Ongoing", "Published", "Hold", "Cancel"],
      default: "Ongoing",
    },
    paperAttachment: {
      // Changed from publicationFile to paperAttachment
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
      name: {
        type: String,
      },
    },
    codeAttachment: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
      name: {
        type: String,
      },
    },
    images: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
        name: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Publication = mongoose.model("Publication", publicationSchema);
