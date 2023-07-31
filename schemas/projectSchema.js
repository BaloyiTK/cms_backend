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
  },
  { timestamps: true }
);

export default projectSchema;
