import mongoose from "mongoose";

const contentSchema = mongoose.Schema(
  {
    // Set dynamic fields using the Mixed type
    dynamicFields: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default contentSchema;
