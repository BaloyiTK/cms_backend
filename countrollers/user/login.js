import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../token/generateToken.js";

// async handler to handle the login functionality
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all the required fields!");
  }
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User not found , please sign-up!");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  const token = generateToken(user._id);

  // set a cookie containing the token
  const tokenExpires = new Date(Date.now() + 1000 * 60 * 60 * 6);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    expires: tokenExpires,
    path: "/",
    sameSite: "none",
  });

  // if the passwords match, return the user's data and token in the response body with a 200 status code
  if (passwordMatch) {
    const { _id, username, email, photo } = user;
    return res.status(200).json({ _id, username, email, photo, token });
  } else {
    // if the passwords don't match, return a 400 status code with an error message
    res.status(400);
    throw new Error("Incorrect email or password!");
  }
});

// export the login function
export default login;
