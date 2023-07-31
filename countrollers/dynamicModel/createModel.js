import DynamicModel from "../../models/dynamicModel.js";
import Project from "../../models/projectModel.js";

const createModel = async (req, res) => {
  try {
    const { schema, modelName } = req.body;
    const { projectId } = req.params

    const project = await Project.findById(projectId);
    const model = await DynamicModel.findOne({ modelName, projectId });

    if (schema.length === 0) {
      return res.status(404).send("Add at least one field");
    }

    if (!project) {
      return res.status(404).send("Project not found");
    }

    if (model) {
      return res.status(409).send("Model already created");
    }

    const convertedSchema = {
      fields: [],
      projectId: projectId,
      modelName: modelName,
    };

    schema.forEach((field) => {
      const convertedField = {
        name: field.name,
        type: field.type,
        required: field.required || false,
      };
      convertedSchema.fields.push(convertedField);
    });

    const dynamicModel = new DynamicModel(convertedSchema);
    await dynamicModel.save();

    return res.status(200).send("Successfully created the model.");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error occurred while creating the model.");
  }
};

export default createModel;
