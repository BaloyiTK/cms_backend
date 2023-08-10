import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import { generateToken } from "../../token/generateToken.js";
import { passwordResetEmail } from "./passwordResetEmail.js";

// async handler to handle the login functionality
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  console.log(req.body);

  if (!email) {
    res.status(400);
    throw new Error("Please fill all the required fields!");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User not found , please sign-up!");
  }

  // Generate a token for resetting the password
  const token = generateToken(user._id);
  const type = "forgot";
  passwordResetEmail(token, user, type);

  // Return a success response with a message indicating that the password reset link has been sent
  return res.status(200).json({
    message:
      "Password reset link has been sent to your email. Please check your inbox and follow the instructions to reset your password within an hour.",
  });
});

export default forgotPassword;
