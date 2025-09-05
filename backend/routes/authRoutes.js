import express from "express";
import { loginAdmin, registerAdmin } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginAdmin);

// optional route to create the first admin user
router.post("/register", registerAdmin);

export default router;
