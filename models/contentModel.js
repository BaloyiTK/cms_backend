import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    modelName: {
      type: String,
      required: true,
    },
    stage: {
      type: String,
      required: true,
    },
    relatedModels: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'DynamicModel' } // Assuming 'DynamicModel' is the related model's name
    ]
    // Add other properties specific to your ContentModel
  },
  { strict: false, timestamps: true }
);

const ContentModel = mongoose.model("ContentModel", contentSchema);

export default ContentModel;
