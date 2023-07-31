import asyncHandler from "express-async-handler";
import ContentModel from "../../models/contentModel.js";

const getContent = asyncHandler(async (req, res) => {
  
  const { projectId, modelName } = req.params;
  const userId = req.user_id;
  const { recordId } = req.query;

  if (recordId) {
    const content = await ContentModel.find({
      projectId,
      modelName,
      userId,
      _id: recordId,
    }).sort({ createdAt: -1 }); // Sort by createdAt in descending order
    res.send(content);
  } else {
    const contents = await ContentModel.find({ projectId, modelName, userId })
      .sort({ createdAt: -1 }); // Sort by createdAt in descending order
    res.send(contents);
  }
});

export default getContent;
