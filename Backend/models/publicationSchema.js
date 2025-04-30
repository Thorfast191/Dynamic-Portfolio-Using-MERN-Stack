import mongoose from "mongoose";

const publicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Enter Your Full Name!"],
  },

  description: {
    type: String,
  },

  publication: {
    public_id: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
  },
});

export const Publication = mongoose.model("Publication", publicationSchema);
