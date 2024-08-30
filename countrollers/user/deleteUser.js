import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

// Define an async function for deleting a user
const deleteUser = asyncHandler(async (req, res) => {
  // Extract the user ID from the request object
  const userId = req.user_id;

  // Find the user with the specified ID in the database
  const user = await User.findById(userId);

  if (user) {
    // Delete the user from the database
    await User.deleteOne({ _id: userId });

    res.status(200).json({ message: "User deleted successfully" });
  } else {
    // If the user is not found, return an error message
    res.status(404);
    throw new Error("User not found!");
  }
});

// Export the deleteUser function for use in other files
export default deleteUser;
