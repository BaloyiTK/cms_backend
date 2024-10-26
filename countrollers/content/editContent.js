import asyncHandler from "express-async-handler";
import ContentModel from "../../models/contentModel.js";
import cloudinary from "cloudinary";

// Configure the Cloudinary SDK with your account details
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const editContent = asyncHandler(async (req, res) => {
  const { contentId } = req.params;
  const { inputValues, dynamicFields,stage } = req.body;
  

  try {
    // Filter only the fields of type "Media" from dynamicFields and extract their names
    const mediaFieldNames = dynamicFields
      .filter((field) => field.type === "Media")
      .map((mediaField) => mediaField.name);

    // Iterate through the mediaFieldNames and process the corresponding "Media" fields
    for (const fieldName of mediaFieldNames) {
      const mediaValue = inputValues[fieldName];

      

      // If it's not a Blob URL, it's already in a format that can be uploaded directly.
      try {
      
        if (mediaValue.startsWith("blob:")) {
          const cloudinaryResponse = await cloudinary.uploader.upload(
            mediaValue,
            {
              resource_type: "video",
              resource_format: "mp4",
            }
          );
          inputValues[fieldName] = cloudinaryResponse.secure_url;
        
        } else if (mediaValue.startsWith("data:image/")) {
          
          const cloudinaryResponse = await cloudinary.uploader.upload(mediaValue)
          inputValues[fieldName] = cloudinaryResponse.secure_url;
    
        }
  
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        return res.status(500).json({ message: "Cloudinary upload failed." });
      }
    }

    // Find the content by contentId and modelName
    const updatedContent = await ContentModel.findByIdAndUpdate(
      contentId,
      { ...inputValues, stage },
      { new: true }
    );

    // The "new: true" option returns the updated document after the update operation

    if (updatedContent) {
      return res.status(200).json({ message: "updated" });
    } else {
      return res.status(404).json({ message: "Content not found" });
    }
  } catch (err) {
    // If any error occurs during the try block, it will be caught here
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default editContent;
