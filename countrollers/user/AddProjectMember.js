import asyncHandler from "express-async-handler";
import Project from "../../models/projectModel.js";
import User from "../../models/userModel.js";

const addProjectMember = asyncHandler(async (req, res) => {
  try {
    const { email, role } = req.body;
    const { projectId } = req.params;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found, only registered users can be added to a project");
    }

    // Find the project by its ID
    const project = await Project.findById(projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    // Check if the user is already added to the project
    const isUserAlreadyAdded = project.users.find(
      (projectUser) => String(projectUser.user) === String(user._id)
    );

    if (isUserAlreadyAdded) {
      throw new Error(`User is already added to ${project.name}`);
    }

    // Add the user to the project with the specified role or a default role if not provided
    project.users.push({
      user: user._id,
      role: role || "Editor",
    });

    await project.save();

    res.status(200).json({
      message: "Member added to the project successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

export default addProjectMember;
