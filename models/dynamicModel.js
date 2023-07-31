import mongoose from "mongoose";

const DynamicSchema = new mongoose.Schema(
  {
    modelName: {
      type: String,
      required: true
    },projectId: {
      type: String,
      required: true
    },
    fields: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  { timestamps: true }
);

const DynamicModel = mongoose.model("DynamicModel", DynamicSchema);

export default DynamicModel;


