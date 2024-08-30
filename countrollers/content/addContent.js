import ContentModel from "../../models/contentModel.js";
import User from "../../models/userModel.js";
import asyncHandler from "express-async-handler";

const addContent = asyncHandler(async (req, res) => {
  const userId = req.user_id;
  const { fields, modelName , stage, publishDateTime } = req.body;
  const { projectId } = req.params;

  const user = await User.findById(userId);
  const missingFields = [];
  const contentData = {
    stage: stage,
    username: user.username,
    modelName: modelName,
    projectId: projectId, 
    userId: userId,
  };

  if (stage === "Scheduled") {
    contentData.publishDateTime = publishDateTime;
  }

  fields.forEach((field) => {
    const fieldName = field.name;
    const requiredField = field.required;
    const fieldValue = req.body.formData[fieldName];
   

    if (requiredField && !fieldValue) {
      missingFields.push(fieldName)
    } else {
      contentData[fieldName] = fieldValue; // Add the field name and value to the contentData object
    }
  });

  if (missingFields.length > 0) {
    

    res.status(400);
    throw new Error("The following fields are required: " + missingFields.join(", "))
    
  } else {
    try {
      const content = new ContentModel(contentData); // Create a new instance of ContentModel with the contentData

      // Save the content to the database
      await content.save();

      res.send(content);
    } catch (error) {
      res.status(500).send("Failed to add content")
    }
  }
});

export default addContent;
