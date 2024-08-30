
import DynamicModel from "../../models/dynamicModel.js";
import ContentModel from "../../models/contentModel.js";

const deleteModel = async (req, res) => {
  const { projectId } = req.params;
  const { modelName } = req.body.selectedModel;

  try {
    // Delete the associated content
    const deleteAssociatedContentResult = await ContentModel.deleteMany({
      projectId,
      modelName,
    });

    // Delete the model
    const deleteModelResult = await DynamicModel.deleteOne({
      projectId,
      modelName,
    });

    if (deleteModelResult.deletedCount > 0) {
      // Model and associated content were deleted successfully
      res.send("Model and associated content deleted successfully.");
    } else {
      // No model found or deleted
      res.send("No model found for deletion.");
    }
  } catch (error) {
    // Handle any errors that occurred during the deletion process
    console.error("Error deleting model and associated content:", error);
    res.status(500).send("Error deleting model and associated content.");
  }
};

export default deleteModel;
