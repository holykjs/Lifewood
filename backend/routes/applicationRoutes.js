import express from "express";
import { 
  createApplication,
  getApplications,
  getApplication,
  updateApplication,
  deleteApplication,
  notifyApplicant,
} from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public (frontend form submission)
router.post("/", createApplication);

// Admin-only (protected)
router.get("/", protect, getApplications);
router.get("/:id", protect, getApplication);
router.put("/:id", protect, updateApplication);
router.delete("/:id", protect, deleteApplication);

router.post("/:id/notify", protect, notifyApplicant);

export default router;
