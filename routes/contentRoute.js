import express from "express";
import protect from "../middlewares/authMiddleware.js";
import addContent from "../countrollers/content/addContent.js";
import getContent from "../countrollers/content/getContent.js";
import deleteContent from "../countrollers/content/deleteContent.js";
import publishContent from "../countrollers/content/publishContent.js";
import autoPublishContent from "../countrollers/content/autoPublishContent.js";
import updateContent from "../countrollers/content/updateContent.js";
import editContent from "../countrollers/content/editContent.js";
import updateBulk from "../countrollers/content/updateBulk.js";

const router = express.Router();

router.post("/content/:modelName/:projectId", protect, addContent);
router.get("/content/:modelName/:projectId", protect, getContent);
router.delete("/content/:modelName", protect, deleteContent);
router.patch("/content/:modelName/:contentId", protect, updateContent);
router.patch("/content/:modelName/:contentId", protect, publishContent);
router.patch("/content/:modelName/:contentId/update", protect, editContent);
router.patch("/content/:modelName", protect, updateBulk);
router.patch("/content/publish", autoPublishContent);

export default router;
