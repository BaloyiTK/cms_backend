import mongoose from 'mongoose';
import DynamicModel from '../../models/dynamicModel.js';


const getModels = async (req, res) => {
  try {
    const { projectId } = req.params;
    
    // Find all documents in the DynamicModel collection that match the projectId
    const dynamicModels = await DynamicModel.find({projectId})
  

    res.status(200).json(dynamicModels);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error')
  }
};

export default getModels;

