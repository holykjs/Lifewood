import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import seedAdmin from "./seedAdmin.js";
import mongoose from "mongoose";


dotenv.config();
connectDB();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected");
    await seedAdmin(); // Seed admin at startup
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const app = express();
app.use(express.json());

// CORS configuration: allow list from env FRONTEND_ORIGINS (comma-separated)
const defaultAllowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://lifewood-one.vercel.app",
];
const envAllowedOrigins = (process.env.FRONTEND_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const allowedOrigins = envAllowedOrigins.length
  ? envAllowedOrigins
  : defaultAllowedOrigins;

// CORS allow function: exact allowlist or any https *.vercel.app
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    try {
      const url = new URL(origin);
      const isVercel = url.protocol === "https:" && url.hostname.endsWith(".vercel.app");
      if (isVercel) return callback(null, true);
    } catch {}
    return callback(new Error(`CORS: Origin not allowed: ${origin}`));
  },
  credentials: true,
};
app.use(cors(corsOptions));
// Ensure preflight requests succeed for all routes in Express 5
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
