import asyncHandler from "express-async-handler";
import ContentModel from "../../models/contentModel.js";
import Project from "../../models/projectModel.js";
import User from "../../models/userModel.js";

const getContent = asyncHandler(async (req, res) => {
  const { projectId, modelName } = req.params;
  const userId = req.user_id;

  try {
    // Fetch the user and project details
    const user = await User.findById(userId);
    const project = await Project.findById(projectId);

    if (!user || !project) {
      return res.status(404).json({ message: "User or project not found." });
    }

    // Check if the user is part of the project
    const isUserInProject = project.users.some(userEntry => userEntry.user.equals(userId));

    if (!isUserInProject) {
      return res.status(403).json({ message: "User is not authorized to access this project." });
    }

    // Fetch all content for the specified project and model
    const contents = await ContentModel.find({ projectId, modelName }).sort({ createdAt: -1 });
    res.json(contents);

  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching content.", error: error.message });
  }
});

export default getContent;
