import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import { passwordResetEmail } from "./passwordResetEmail.js";

const resetPassword = asyncHandler(async (req, res) => {
  const token = req.query.token; // Extract the token from the request query parameter

  let verified;
  try {
    verified = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the JWT_SECRET from the environment variables
  } catch (err) {
    res.status(400); // If the token is invalid or expired, return an error response
    throw new Error("Invalid or expired token");
  }

  const user = await User.findById(verified.id); // Find the user by the ID extracted from the token

  if (!user) {
    res.status(400); // If no user is found, return an error response
    throw new Error("User not found");
  }

  const { confirmPassword, newPassword } = req.body; // Extract the new password and confirm password from the request body

  if (!newPassword || !confirmPassword) {
    res.status(400); // If any of the passwords are missing, return an error response
    throw new Error("Please fill in all the required fields");
  }

  if (newPassword !== confirmPassword) {
    res.status(400); // If the passwords do not match, return an error response
    throw new Error("Passwords do not match. Please try again");
  }

  user.password = newPassword; // Set the new password
  await user.save(); // Save the user

  passwordResetEmail(undefined, user, undefined); // Send a password reset email

  return res.status(200).json({ message: "Password reset successful" }); // Return a success response
});

export default resetPassword;
