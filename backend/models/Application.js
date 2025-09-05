import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    degree: { type: String, required: true },
    relevantExperience: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    projectAppliedFor: { type: String, required: true },
    resume: { type: String, required: true }, 
    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
