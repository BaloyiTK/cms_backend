import asyncHandler from "express-async-handler";
import Project from "../../models/projectModel.js";

const getProjectsByUserId = asyncHandler(async (req, res) => {
  try {
    const userId = req.user_id; // Get the user's ID from your authentication middleware

    // Find all projects where the user's ID appears in the users array
    const projects = await Project.find({ "users.user": userId })

    if (!projects || projects.length === 0) {
      return res.status(404).json({
        message: "No projects found for this user.",
      });
    }

    // Return the projects data
    res.status(200).json({
      message: "Projects retrieved successfully",
      projects,
    });
  } catch (error) {
    // Handle any errors that occur during the database query or processing
    console.error(error);
    res.status(500).json({
      message: "An error occurred while retrieving projects.",
    });
  }
});

export default getProjectsByUserId;
