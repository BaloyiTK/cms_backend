import asyncHandler from "express-async-handler";
import Project from "../../models/projectModel.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

//dotenv.config();

// Configure the Cloudinary SDK with your account details
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

const addProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user_id;

  if (!name) {
    res.status(400);
    throw new Error("Please fill in all the required fields");
  }

  // Check if project with the same name already exists
  const existingProject = await Project.findOne({ name, userId });

  if (existingProject) {
    res.status(400);
    throw new Error("Project with the same name already exists");
  }

  const project = await Project.create({
    name,
    description,
    userId,
  });

  return res.status(200).json({
    message: "Project added successfully",
    project,
  });
});

export default addProject;
