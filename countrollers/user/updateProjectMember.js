import asyncHandler from "express-async-handler";
import Project from "../../models/projectModel.js";

const updateProjectMember = asyncHandler(async (req, res) => {
  try {
    const { projectId, memberId } = req.params;

    const { role } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const member = project.users.find(
      (user) => user._id.toString() === memberId
    );

    if (!member) {
      return res
        .status(404)
        .json({ message: "Member not found in the project" });
    }

    member.role = role;

    await project.save();

    res.status(200).json({ message: "Member role updated successfully" });
  } catch (error) {
    console.error("Error updating member role:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default updateProjectMember;
