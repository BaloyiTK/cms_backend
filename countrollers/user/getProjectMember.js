import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js"; // Import your User model

// async handler to handle getting a project member by userId
const getProjectMember = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  // Use your User model to find the user by userId
  const user = await User.findById(userId);

  if (user) {
    // If the user is found, you can respond with user data
    res.json({
  user
      // Add any other user properties you want to include in the response
    });
  } else {
    // If the user is not found, respond with a 404 status
    res.status(404);
    throw new Error("User not found");
  }
});

export default getProjectMember;
