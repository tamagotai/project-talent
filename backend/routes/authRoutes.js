import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();
//Login
// router.post("/login", authController.login);
//Register
// router.post("/register", authController.register);

// Admin user only
//router.get('/adminonly', verifyToken, adminOnly, userController.adminonly);

export default router;