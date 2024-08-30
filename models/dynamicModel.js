import mongoose from "mongoose";

const dynamicSchema = new mongoose.Schema({
  modelName: {
    type: String,
    required: true
  },
  projectId: {
    type: String,
    required: true
  },
  fields: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  relatedModels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DynamicModel' }],
  mainModel: { type: mongoose.Schema.Types.ObjectId, ref: 'DynamicModel' }
}, { timestamps: true });

const DynamicModel = mongoose.model("DynamicModel", dynamicSchema);

export default DynamicModel
