import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/projects.css"; // Ensure this path is correct
import aiDataExtractionVideo from '../videos/aiDataExtractionVideo.mp4';
import machineLearningEnablementVideo from '../videos/machine_learning_enablement.mp4';
import genealogyVideo from '../videos/genealogy.mp4';
import naturalLanguageProcessingVideo from '../videos/natural_language_processing.mp4';
import customerServiceVideo from '../videos/ai_enabled_customer_service.mp4';
import computerVisionVideo from '../videos/computer_vision.mp4';
import autonomousDrivingVideo from '../videos/autonomous_driving_technology.mp4';

const projects = [
  {
    id: 1,
    title: "AI DATA EXTRACTION",
    description:
      "Using AI, we optimise the acquisition of image and text from multiple sources. Techniques include onsite scanning, drone photography, negotiation with archives and the formation of alliances with corporations, religious organisations and governments.",
    video: aiDataExtractionVideo,
    alt: "Man in a data center with monitors displaying complex data",
  },
  {
    id: 2,
    title: "MACHINE LEARNING ENABLEMENT",
    description:
      "From simple data to deep learning, our data solutions are highly flexible and can enable a wide variety of ML systems, no matter how complex the model.",
    video: machineLearningEnablementVideo,
    alt: "Scientists and robots in a futuristic lab environment",
  },
  {
    id: 3,
    title: "GENEALOGY",
    description:
      "Powered by AI, Lifewood processes genealogical material at speed and scale, to conserve and illuminate family histories, national archives, corporate records and registers in any language, age or condition.",
    video: genealogyVideo,
    alt: "Family looking at a large ancient tree, symbolizing heritage",
  },
  {
    id: 4,
    title: "NATURAL LANGUAGE PROCESSING",
    description:
      "We have partnered with some of the world's most advanced companies in NLP development. With a managed workforce that spans the globe, we offer solutions in over 50 language capabilities.",
    video: naturalLanguageProcessingVideo,
    alt: "Woman's face with digital data overlay, representing NLP",
  },
  {
    id: 5,
    title: "AI-ENABLED CUSTOMER SERVICE",
    description:
      "AI-enabled customer service is now the quickest and most effective route for institutions to deliver personalized, proactive experiences that drive customer engagement.",
    video: customerServiceVideo,
    alt: "Customer service agent wearing a headset in a call center",
  },
  {
    id: 6,
    title: "COMPUTER VISION",
    description:
      "Training AI to see and understand the world requires a high volume of quality training data. Lifewood provides total data solutions for your CV development from collection to annotation to classification and more, for video and image datasets.",
    video: computerVisionVideo,
    alt: "Abstract cityscape with glowing lights, representing computer vision",
  },
  {
    id: 7,
    title: "AUTONOMOUS DRIVING TECHNOLOGY",
    description:
      "At Lifewood, innovation drives us continually forward. This is especially true of our contribution to the development of Autonomous Driving Technology.",
    video: autonomousDrivingVideo,
    alt: "Sleek white autonomous car in a high-tech lab",
  },
];

const ProjectsPage = () => {
  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="projects-page-container">
      {/* Simple Page Header */}
      <motion.header
        className="projects-header"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <h1>Our Projects</h1>
        <p>Innovative AI solutions driving change across industries.</p>
      </motion.header>

      {/* Projects Grid */}
      <motion.div
        className="modern-projects-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="project-card"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="project-img-wrapper">
                <video
                    src={project.video}
                    alt={project.alt}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="project-video"
                />
            </div>
            <div className="project-card-content">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <Link to="/apply" className="apply-btn">
                Apply Now
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Closing CTA Section */}
      <motion.section
        className="projects-closing-cta"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <h2 className="closing-cta-text">
          No one makes new discoveries by standing still.
        </h2>
        <Link to="/apply" className="cta-button-bottom">
          BE AMAZED <span className="highlight-dot">●</span>
        </Link>
      </motion.section>
    </div>
  );
};

export default ProjectsPage;