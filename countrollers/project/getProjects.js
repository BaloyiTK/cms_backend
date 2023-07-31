import asyncHandler from "express-async-handler";
import Project from "../../models/projectModel.js";

// Define an async function for getting user details
const getProjects = asyncHandler(async (req, res) => {

    const userId = req.user_id;
 

   const projects = await Project.find({ userId: userId });

    if (!projects || projects.length === 0) {
        res.status(404);
        throw new Error("Projects not found!");
    }

    res.send(projects);
    
});

export default getProjects;
