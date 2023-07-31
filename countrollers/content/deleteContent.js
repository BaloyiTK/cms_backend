import asyncHandler from "express-async-handler";
import ContentModel from "../../models/contentModel.js";

// Define an async function for getting user details
const deleteContent = asyncHandler(async (req, res) => {
  const { ids } = req.body;

  const content = await ContentModel.deleteMany({ _id: ids });

  if (content) {
    res.send("deleted");
  }
});

export default deleteContent;
