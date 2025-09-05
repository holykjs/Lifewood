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
app.use(cors());
app.use(express.json());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
