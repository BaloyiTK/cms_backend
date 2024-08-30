import asyncHandler from "express-async-handler";
import Project from "../../models/projectModel.js";
import User from "../../models/userModel.js";

const deleteProjectMember = asyncHandler(async (req, res) => {
  const { memberId, projectId } = req.params;

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.users.pull({ _id: memberId });

    await project.save();

    res.json({ message: "Member deleted from the project" });
  } catch (error) {
    console.error("Error deleting member:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default deleteProjectMember;
