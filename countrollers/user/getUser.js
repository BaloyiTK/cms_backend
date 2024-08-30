import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";


// Define an async function for getting user details
const getUser = asyncHandler(async (req, res) => {
  
  // Extract the user ID from the request object
  const userId = req.user_id;
  
  // Find the user with the specified ID in the database
  const user = await User.findById(userId);

  if (user) {
    // Extract the relevant user details and return them in the response
    const { _id, username, email, photo, apiKey } = user;
    return res.status(200).json({ _id, username, email, photo, apiKey })
  } else {
    // If the user is not found, return an error message
    res.status(400);
    throw new Error("user not found!");
  }
});

// Export the getUser function for use in other files
export default getUser;
