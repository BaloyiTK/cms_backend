import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    userId: {
      type: String,
      required: true,
    },
    apiCall: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default projectSchema;
