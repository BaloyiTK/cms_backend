import asyncHandler from "express-async-handler";
import DynamicModel from "../../models/dynamicModel.js";

const createRelationship = asyncHandler(async (req, res) => {
    console.log("called");
    try {
        const { mainModelId, relatedModelId, relationshipType } = req.body;

        // Find the main model and related model by their IDs
        const mainModel = await DynamicModel.findById(mainModelId);
        const relatedModel = await DynamicModel.findById(relatedModelId);

        if (!mainModel || !relatedModel) {
            return res.status(404).json({ error: 'Main model or related model not found' });
        }

        // Depending on the relationshipType, establish the relationship
        switch (relationshipType) {
            case 'one-to-many':
                mainModel.relatedModels.push(relatedModel);
                break;
            case 'many-to-one':
                relatedModel.mainModel = mainModel;
                break;
            case 'many-to-many':
                mainModel.relatedModels.push(relatedModel);
                relatedModel.mainModel.push(mainModel);
                break;
            default:
                return res.status(400).json({ error: 'Invalid relationship type' });
        }
        console.log('mainModel:', mainModel);
console.log('relatedModel:', relatedModel);

        // Save changes to both models
        await mainModel.save();
        await relatedModel.save();

        // Populate the main model with the related model data
        const mainModelWithRelated = await DynamicModel
            .findById(mainModelId)
            .populate('relatedModels'); // Replace 'relatedModels' with the actual field name

        console.log(mainModel);

        res.status(200).json({ message: 'Relationship created successfully' });
    } catch (error) {
        console.error('Error creating relationship:', error);
        res.status(500).json({ error: 'An error occurred while creating the relationship' })
    }
});

export default createRelationship;
