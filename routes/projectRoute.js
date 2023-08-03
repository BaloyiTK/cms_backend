import express from "express";
import multer from "multer";
import fs from "fs";
import addProject from "../countrollers/project/addProject.js";
import getProject from "../countrollers/project/getProjects.js";
import protect from "../middlewares/authMiddleware.js";
import getOneProject from "../countrollers/project/getOneProject.js";
import deleteProject from "../countrollers/project/deleteProject.js";
import updateProject from "../countrollers/project/updateProject.js";


// Set up Multer storage engine
const storage = multer.diskStorage({
  //destination: (req, file, cb) => {
  // cb(null, "uploads/");
  //},
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// Set up Multer upload middleware
const upload = multer({ storage: storage });

// Create the uploads directory if it does not exist
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

const router = express.Router();

router.post("/project",upload.single("image"), protect, addProject);
router.get("/project", protect, getProject);
router.get("/project/:projectId", protect, getOneProject);
router.delete("/project/:projectId",protect, deleteProject);
router.patch("/project/:projectId", updateProject);
//router.patch("/project/:projectId/apiCall", apiCall);

export default router;
