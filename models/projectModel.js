import mongoose from "mongoose";
import projectSchema from "../schemas/projectSchema.js";

const Project = mongoose.model("Project", projectSchema);

export default Project
