import ContentModel from "../../models/contentModel.js";
import User from "../../models/userModel.js";
import asyncHandler from "express-async-handler";
import cloudinary from "cloudinary";

// Configure the Cloudinary SDK with your account details
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const addContent = asyncHandler(async (req, res) => {
  const userId = req.user_id;
  const { fields, modelName, stage, publishDateTime } = req.body;
  const { projectId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const missingFields = [];
    const contentData = {
      stage,
      username: user.username,
      modelName,
      projectId,
      userId,
    };

    if (stage === "Scheduled") {
      contentData.publishDateTime = publishDateTime;
    }

    for (const field of fields) {
      const { name: fieldName, type: fieldType, required: requiredField } = field;
      const fieldValue = req.body.formData[fieldName];

      if (requiredField && !fieldValue) {
        missingFields.push(fieldName);
      } else if (fieldType === "Media") {
        try {
          let uploadResult;

          if (fieldValue.startsWith("blob:")) {
            uploadResult = await cloudinary.uploader.upload(fieldValue, {
              resource_type: "auto",
            });
          } else if (fieldValue.startsWith("data:image/")) {
            uploadResult = await cloudinary.uploader.upload(fieldValue);
          } else {
            console.warn(`Unsupported media format for ${fieldName}: ${fieldValue}`);
            continue; // Skip unsupported formats
          }

          contentData[fieldName] = uploadResult.secure_url;
        } catch (uploadError) {
          console.error("Cloudinary upload error:", uploadError);
          return res.status(500).json({ success: false, message: "Failed to upload media." });
        }
      } else {
        contentData[fieldName] = fieldValue; // Add non-media fields to contentData
      }
    }

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: " + missingFields.join(", "),
      });
    }

    const content = new ContentModel(contentData);
    await content.save();

    return res.status(201).json({ success: true, content });
  } catch (error) {
    console.error("Error adding content:", error);
    return res.status(500).json({ success: false, message: "Failed to add content." });
  }
});

export default addContent;
