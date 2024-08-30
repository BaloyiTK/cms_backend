import express from "express";
import protect from "../middlewares/authMiddleware.js";
import createModel from "../countrollers/dynamicModel/createModel.js";
import getModel from "../countrollers/dynamicModel/getModel.js";
import deleteModel from "../countrollers/dynamicModel/deleteModel.js";
import updateModel from "../countrollers/dynamicModel/updateModel.js";
import createRelationship from "../countrollers/dynamicModel/createRelationship.js";

const router = express.Router();

router.post("/model/:projectId", protect, createModel);
router.get("/model/:projectId", protect, getModel);
router.delete("/model/:projectId", protect, deleteModel);
router.patch("/model/:projectId/:modelName", protect, updateModel);
router.post("/model/relationship/create", protect, createRelationship);

export default router;
