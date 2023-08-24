import asyncHandler from "express-async-handler";
import Project from "../../models/projectModel.js";

const addProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user_id;

  if (!name) {
    res.status(400);
    throw new Error("Please fill in all the required fields");
  }

  // Check if a project with the same name already exists for the current user
  const existingProject = await Project.findOne({ name, "users.user": userId });

  if (existingProject) {
    res.status(400);
    throw new Error("Project with the same name already exists");
  }

  const project = await Project.create({
    name,
    description,
    users: [
      {
        user: userId, // Associate the current user with the project
        role: "admin", // Assign the role to the current user as 'admin'
      },
    ],
  });

  return res.status(200).json({
    message: "Project added successfully",
    project,
  });
});

export default addProject;
