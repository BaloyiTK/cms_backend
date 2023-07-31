import asyncHandler from "express-async-handler";
import Project from "../../models/projectModel.js";
import DynamicModel from "../../models/dynamicModel.js";

const updateProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const {name, description} =  req.body


    // Find the project by ID
    const project = await Project.findById(projectId);
  
    if (project) {
      // Update the project properties
      project.name =name;
      project.description = description;
      // ... add more properties to update as needed
  
      // Save the updated project
      const updatedProject = await project.save();
  
      res.status(200).json({ message: "Project updated successfully", project: updatedProject });
    } else {
      res.status(404).json({ message: "Project not found" });
    }
});

export default updateProject;