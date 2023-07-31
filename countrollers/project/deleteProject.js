import asyncHandler from "express-async-handler";
import Project from "../../models/projectModel.js";
import DynamicModel from "../../models/dynamicModel.js";

const deleteProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  // Find the project by ID
  const project = await Project.findByIdAndDelete(projectId);

  const dynamicModels = await DynamicModel.deleteMany({ projectId });

  if (project) {
    res.status(200).json({ message: "Project deleted successfully" });
  } else {
    res.status(404).json({ message: "Project not found" });
  }
});

export default deleteProject;
