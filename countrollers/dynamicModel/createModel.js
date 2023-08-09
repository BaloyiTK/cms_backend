import asyncHandler from "express-async-handler";
import DynamicModel from "../../models/dynamicModel.js";
import Project from "../../models/projectModel.js";

const createModel = asyncHandler(async (req, res) => {
  const { schema, modelName } = req.body;
  const { projectId } = req.params;

  const project = await Project.findById(projectId);
  const model = await DynamicModel.findOne({ modelName, projectId });

  if (!schema.length) {
  //  return res.status(400).send("Add at least one field");
    res.status(400);
    throw new Error("Add at least one field!");
  }

  if (!project) {
    return res.status(404).send("Project not found");
  }

  if (model) {
    return res.status(409).send("Model already created");
  }

  const convertedSchema = {
    fields: schema.map((field) => ({
      name: field.name,
      type: field.type,
      required: field.required || false,
    })),
    projectId,
    modelName,
  };

  const dynamicModel = new DynamicModel(convertedSchema);
  await dynamicModel.save();

  return res.status(201).send("Successfully created the model.");
});

export default createModel;
