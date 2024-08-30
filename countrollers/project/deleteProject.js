import asyncHandler from "express-async-handler";
import Project from "../../models/projectModel.js";
import DynamicModel from "../../models/dynamicModel.js";

const deleteProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  try {
    // Find the project by ID and delete it
    const project = await Project.findByIdAndDelete(projectId);

    // Delete associated dynamic models
    await DynamicModel.deleteMany({ projectId });

    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500);
    throw new Error("An error occurred while deleting the project");
  }
});

export default deleteProject;
