import asyncHandler from "express-async-handler";
import Project from "../../models/projectModel.js";
import User from "../../models/userModel.js"; // Import the User model or replace with your actual user model import

// async handler to handle adding a member to a project
const addProjectMember = asyncHandler(async (req, res) => {
  try {
    const { email, role } = req.body;
    const { projectId } = req.params;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
   

      res.status(404);
      throw new Error("User not found");


    }

    // Find the project by its ID
    const project = await Project.findById(projectId)

    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }

    const userExistInProject = await Project.findOne({
      _id: projectId,
      "users.user": user._id,
    });

    if (userExistInProject) {
      res.status(404);
      throw new Error("Member already exist in  the project");
    }

    // Add the user to the project with the specified role or a default role if not provided
    project.users.push({
      user: user._id, // Assuming user._id is the identifier for the user
      role: role || "Editor", // Set a default role if not provided
    });

    await project.save();

    res.status(200).json({
      message: "Member added to the project successfully",
      project,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while adding the member to the project.",


    }
    );

    
  }
});

export default addProjectMember;
