import ContentModel from "../../models/contentModel.js";
import User from "../../models/userModel.js";
import asyncHandler from "express-async-handler";
import cloudinary from "cloudinary"; // Ensure you import and configure Cloudinary

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

    // Log incoming fields and form data
    console.log("Received fields:", fields);
    console.log("Received formData:", req.body.formData);

    for (const field of fields) {
      console.log(`Processing field: ${JSON.stringify(field)}`); // Log each field

      const { name: fieldName, type: fieldType, required: requiredField } = field;
      const fieldValue = req.body.formData[fieldName];

      if (requiredField && !fieldValue) {
        missingFields.push(fieldName)
      } else if (fieldType === "Media") {
        console.log(`Found media field: ${fieldName}, value: ${fieldValue}`); // Log if it's a media field
        try {
          const uploadResult = await cloudinary.v2.uploader.upload(fieldValue, {
            resource_type: "auto",
          });
          console.log(`Uploaded ${fieldName}:`, uploadResult); // Log upload result
          contentData[fieldName] = uploadResult.secure_url;
        } catch (uploadError) {
          console.error(`Failed to upload ${fieldName}:`, uploadError);
          return res.status(500).json({ success: false, message: "Failed to upload media." });
        }
      } else {
        contentData[fieldName] = fieldValue;
      }
    }

    if (missingFields.length > 0) {
      return res.status(400).json({ success: false, message: "Missing required fields: " + missingFields.join(", ") });
    }

    const content = new ContentModel(contentData);
    await content.save();

    res.status(201).json({ success: true, content });
  } catch (error) {
    console.error("Error adding content:", error); // Log the error for debugging
    res.status(500).json({ success: false, message: "Failed to add content.", error: error.message });
  }
});

export default addContent;
