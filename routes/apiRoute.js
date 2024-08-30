import express from "express";
import protect from "../middlewares/authMiddleware.js";
import authenticateKey from "../api/authenticateKey.js";
import getContent from "../countrollers/content/getContent.js"

const router = express.Router();


router.get("/content/:projectId", authenticateKey,getContent);

export default router;
