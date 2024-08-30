import express from "express";
import multer from "multer";
import fs from "fs";
import register from "../countrollers/user/register.js";
import login from "../countrollers/user/login.js";
import protect from "../middlewares/authMiddleware.js";
import getUser from "../countrollers/user/getUser.js";
import logout from "../countrollers/user/logout.js";
import deleteUser from "../countrollers/user/deleteUser.js";
import loginStatus from "../countrollers/user/loginStatus.js";
import updateUser from "../countrollers/user/updateUser.js";
import forgotPassword from "../countrollers/user/forgotPassword.js";
import resetPassword from "../countrollers/user/resetPassword.js";
import AddProjectMember from "../countrollers/user/AddProjectMember.js";
import getProjectMember from "../countrollers/user/getProjectMember.js";
import deleteProjectMember from "../countrollers/user/deleteProjectMember.js";
import updateProjectMember from "../countrollers/user/updateProjectMember.js";

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
//if (!fs.existsSync("./uploads")) {
//  fs.mkdirSync("./uploads");
//}

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/loginStatus",protect, loginStatus);
router.get("/user", protect, getUser);
router.get("/logout", protect, logout);
router.get("/delete", protect, deleteUser);
router.patch("/updateuser", protect, upload.single("profilePicture"), updateUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/addmember/:projectId",protect, AddProjectMember);
router.get("/getmember/:userId",protect, getProjectMember);
router.delete("/deletemember/:projectId/:memberId",protect, deleteProjectMember);
router.patch("/updatemember/:projectId/:memberId",protect, updateProjectMember);

export default router;
