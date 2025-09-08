import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { colors } from "../colors";
import "../styles/form.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import API from "../services/api";
import { 
  User, 
  GraduationCap, 
  FileText, 
  ArrowLeft, 
  ArrowRight, 
  Check 
} from "lucide-react";

const MySwal = withReactContent(Swal);

const ApplicationFormPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    degree: "",
    relevantExperience: "",
    email: "",
    projectAppliedFor: "",
    resume: "",
  });

  const navigate = useNavigate();

  const projects = [
    "AI Data Extraction",
    "Machine Learning Enablement",
    "Natural Language Processing",
    "Computer Vision Development",
    "Data Analytics & Visualization",
    "Cloud Infrastructure & DevOps",
    "Front-end Development",
    "Back-end Development",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/applications", formData);
      console.log("✅ Application saved:", data);

      // reset form
      setFormData({
        firstName: "",
        lastName: "",
        age: "",
        degree: "",
        relevantExperience: "",
        email: "",
        projectAppliedFor: "",
        resume: "",
      });
      setStep(1);

      // success popup
      MySwal.fire({
      title: "Application Submitted 🎉",
      text: "Redirecting you to Projects...",
      icon: "success",
      timer: 2000, // auto-close after 2s
      showConfirmButton: false, // hide button
      willClose: () => {
        navigate("/courses");
      },
    });

  } catch (err) {
    console.error("❌ Error submitting application:", err);

    MySwal.fire({
      title: "Submission Failed",
      text: "Something went wrong. Please try again later.",
      icon: "error",
      confirmButtonText: "Okay",
      confirmButtonColor: "#d33",
    });
  }
};

  return (
    <div className="form-page">
      <motion.div
        className="form-container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="form-title">🌱 Application Form</h1>
        <p className="form-subtitle">
          Join Lifewood and help build AI-driven sustainable solutions.
        </p>

        {/* Progress Indicator */}
        <div className="progress-wrapper">
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${(step - 1) / 2 * 100}%` }}
            ></div>
          </div>
          <div className="progress-bar">
            <div className={`progress-step ${step >= 1 ? "active" : ""}`}>
              <User size={20} strokeWidth={1.6} />
            </div>
            <div className={`progress-step ${step >= 2 ? "active" : ""}`}>
              <GraduationCap size={20} strokeWidth={1.6} />
            </div>
            <div className={`progress-step ${step >= 3 ? "active" : ""}`}>
              <FileText size={20} strokeWidth={1.6} />
            </div>
          </div>
        </div>

        {/* Form Steps */}
        <form onSubmit={handleSubmit} className="form-fields">
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <>
              <h3 className="form-section-title">👤 Personal Information</h3>
              <div className="form-row">
                <label>
                  First Name
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Last Name
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>

              <label>
                Age
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="16"
                />
              </label>

              <label>
                Email Address
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <div className="form-navigation">
                <button type="button" onClick={handleNext} className="btn btn-next">
                  <span>Next</span>
                  <ArrowRight size={18} strokeWidth={1.5} />
                </button>
              </div>
            </>
          )}

          {/* Step 2: Education & Experience */}
          {step === 2 && (
            <>
              <h3 className="form-section-title">🎓 Education & Experience</h3>
              <label>
                Degree
                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Relevant Experience
                <textarea
                  name="relevantExperience"
                  value={formData.relevantExperience}
                  onChange={handleChange}
                  rows="5"
                  required
                ></textarea>
              </label>

              <div className="form-navigation">
                <button type="button" onClick={handleBack} className="btn btn-back">
                  <ArrowLeft size={18} strokeWidth={1.5} />
                  <span>Back</span>
                </button>
                <button type="button" onClick={handleNext} className="btn btn-next">
                  <span>Next</span>
                  <ArrowRight size={18} strokeWidth={1.5} />
                </button>
              </div>
            </>
          )}

          {/* Step 3: Application Details */}
          {step === 3 && (
            <>
              <h3 className="form-section-title">📄 Application Details</h3>
              <label>
                Project Applied For
                <select
                  name="projectAppliedFor"
                  value={formData.projectAppliedFor}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a Project</option>
                  {projects.map((project) => (
                    <option key={project} value={project}>
                      {project}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Resume Link (Google Drive)
                <input
                  type="url"
                  name="resume"
                  value={formData.resume}
                  onChange={handleChange}
                  placeholder="https://drive.google.com/..."
                  required
                />
              </label>

              <div className="form-navigation">
                <button type="button" onClick={handleBack} className="btn btn-back">
                  <ArrowLeft size={18} strokeWidth={1.5} />
                  <span>Back</span>
                </button>
                <button type="submit" className="btn btn-submit">
                  <Check size={18} strokeWidth={1.5} />
                  <span>Submit</span>
                </button>
              </div>
            </>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default ApplicationFormPage;
