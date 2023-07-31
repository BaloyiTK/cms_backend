import asyncHandler from "express-async-handler";
import Project from "../../models/projectModel.js";

// Define an async function for getting user details
const getOneProject = asyncHandler(async (req, res) => {
    
  const projectId = req.params.projectId;

  const project = await Project.find({ _id: projectId });

  if (!project || project.length === 0) {
    res.status(404);
    throw new Error("Projects not found!");
  }

  res.send(project);
});

export default getOneProject;
