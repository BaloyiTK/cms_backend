// Import the necessary modules
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";

// Create an asynchronous handler function
const loginStatus = asyncHandler(async (req, res) => {
  // Get the token from the "token" cookie in the request
  //const token = req.cookies.token;  for postman
  const token = (req.cookies.token)
  const userId = req.user_id;


  const user = await User.findById(userId)
  if (!user) {
    return res.send("user not fount")
    
  }



  // If there is no token, return a JSON object with a value of false
  if (!token) {
    return res.json(false);
  }

  // Verify the token using the JWT_SECRET environment variable
  const verified = jwt.verify(token, process.env.JWT_SECRET);

  // If the token is verified, return a JSON object with a value of true
  if (verified) {
    return res.json(true);
  }

  // If the token is not verified, return a JSON object with a value of false
  return res.json(false);
});

// Export the function
export default loginStatus;
