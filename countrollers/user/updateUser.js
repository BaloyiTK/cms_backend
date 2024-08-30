import asyncHandler from "express-async-handler";
import User from "../../models/userModel.js";
import cloudinary from "cloudinary";
import ContentModel from "../../models/contentModel.js";
import dotenv from "dotenv";

dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const updateUser = asyncHandler(async (req, res) => {


  const { name, email, password, passwordConfirmation, profilePicturePreview } =
    req.body;


  if (password !== passwordConfirmation) {
    res.send("Passwords do not match");
  }
  const userId = req.user_id;

  // Find the user with the specified ID in the database
  const user = await User.findById(userId);

  if (user) {
    if (profilePicturePreview) {
      const result = await cloudinary.uploader.upload(profilePicturePreview);
      const imageUrl = result.secure_url;
      user.photo = imageUrl || user.photo;
    }

    user.username = name || user.username;
    user.email = email || user.email;
    user.password = password || user.password;

    await user.save();

    await ContentModel.updateMany(
      { userId },
      { $set: { username: user.username } },
      { multi: true }
    );
    res.send(user);
  } else {
    // If the user is not found, return an error message
    res.status(400);
    throw new Error("user not found!");
  }
});

// Export the getUser function for use in other files
export default updateUser;
