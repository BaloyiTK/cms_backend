import asyncHandler from "express-async-handler";
import DynamicModel from "../../models/dynamicModel.js";
import ContentModel from "../../models/contentModel.js";

const updateModel = asyncHandler(async (req, res) => {
  const { fields, updatedModelName } = req.body;
  const { projectId, modelName } = req.params;
  let oldFields = {};
  let newFields = fields;

  const model = await DynamicModel.findOne({ projectId, modelName });

  if (model) {
    // Update the model fields and name
    oldFields = model.fields;
    model.fields = fields;
    model.modelName = updatedModelName;
    await model.save();

    // // Prepare the field name changes
    // const renameFields = {};
    // for (let i = 0; i < oldFields.length; i++) {
    //   const oldFieldName = oldFields[i].name;
    //   const newFieldName = newFields[i].name;
    //   renameFields[oldFieldName] = newFieldName;
    // }

    // // Update content field names and model name in the ContentModel collection
    await ContentModel.updateMany(
      { projectId, modelName },
      {
        $set: { modelName: model.modelName },
      }
    );

    // Prepare the field name changes
    const operations = [];
    for (let i = 0; i < oldFields.length; i++) {
      const oldFieldName = oldFields[i].name;
      const newFieldName = newFields[i].name;
      const updateOperation = {
        updateMany: {
          filter: { projectId, modelName },
          update: {
            $rename: { [oldFieldName]: newFieldName },
          },
        },
      };
      operations.push(updateOperation);
    }

    // Execute bulk write operations
    await ContentModel.bulkWrite(operations);

    const content = await ContentModel.find({ projectId, modelName });

    for (const doc of content) {
      await doc.save(); // Save the updated document
    }

    const contentItems = await ContentModel.find({ projectId, modelName });

    res.send(contentItems);
  } else {
    res.send("Model not found");
  }
});

export default updateModel;
