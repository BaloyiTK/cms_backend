import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import ContentModel from "../models/contentModel.js";
import Project from "../models/projectModel.js"; // Assuming you have the project model defined

const authenticateKey = asyncHandler(
  async ({ headers: { authorization }, params: { projectId } }, res, next) => {
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authorization.substring(7); // Remove "Bearer " prefix to extract the token

    const user = await User.findOne({ apiKey: token });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const contents = await ContentModel.find({
      userId: user.id,
      stage: "Published",
      projectId,
    });

    const groupedContents = contents.reduce((acc, content) => {
      const { _id, userId, createdAt, updatedAt, modelName, ...dynamicFields } =
        content._doc;
      if (!acc[modelName]) {
        acc[modelName] = [];
      }
      acc[modelName].push({
        ...dynamicFields,
        _id: _id.toString(),
        userId: userId.toString(),
        createdAt,
        updatedAt,
      });
      return acc;
    }, {});

    res.send(groupedContents);

    // Increment the call count and save to the database
    try {
      const project = await Project.findById(projectId);
      if (project) {
        project.callCount = (project.callCount || 0) + 1;
        await project.save();
      }
    } catch (error) {
      // Handle error if project not found or other issues
      console.error("Error updating call count:", error);
    }
  }
);

export default authenticateKey;
