import asyncHandler from "express-async-handler";
import ContentModel from "../../models/contentModel.js";

const updateContent = asyncHandler(async (req, res) => {

    const { contentId, modelName } = req.params;
    const { stage } = req.body;

    // Find the content by contentId and modelName
    const content = await ContentModel.findOne({ _id: contentId, modelName });

    if (!content) {
        res.status(404).json({ message: "Content not found" });
        return;
    }

    // Update the content stage
    content.stage = stage;
    await content.save();

    res.json({ message: "Content stage updated successfully", content });
 
});

export default updateContent;

