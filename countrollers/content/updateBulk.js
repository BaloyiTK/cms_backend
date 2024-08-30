import asyncHandler from "express-async-handler";
import ContentModel from "../../models/contentModel.js";

const updateBulk = asyncHandler(async (req, res) => {

  const { modelName } = req.params;
  const { stage, selectedRecords } = req.body;

  // Use the `updateMany` method to update all selected records at once
  const updateResult = await ContentModel.updateMany(
    { _id: { $in: selectedRecords }, modelName },
    { $set: { stage: stage } }
  );

  res.json({ message: "Content stage updated successfully", updateResult });
});

export default updateBulk;
