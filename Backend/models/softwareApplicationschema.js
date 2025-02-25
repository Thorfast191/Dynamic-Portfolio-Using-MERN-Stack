import mongoose from "mongoose";

const softwareApplicationsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    svg: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  { timestamp: true }
);

export const SoftwareApplications = mongoose.model(
  "SoftwareApplications",
  softwareApplicationsSchema
);
