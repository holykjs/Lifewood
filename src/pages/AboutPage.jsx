import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaHandshake,
  FaRocket,
  FaGlobe
} from "react-icons/fa";
import {
  Lightbulb,
  Users,
  ShieldCheck,
  Globe,
  Cpu,
  HeartHandshake,
  Network,
} from "lucide-react";
import "../styles/AboutUsPage.css";

const ecosystemNodes = [
  { id: 1, label: "Innovation", icon: <Lightbulb size={26} /> },
  { id: 2, label: "Collaboration", icon: <Users size={26} /> },
  { id: 3, label: "Integrity", icon: <ShieldCheck size={26} /> },
  { id: 4, label: "Sustainability", icon: <Globe size={26} /> },
  { id: 5, label: "Global Reach", icon: <Network size={26} /> },
  { id: 6, label: "AI Solutions", icon: <Cpu size={26} /> },
  { id: 7, label: "Culture & People", icon: <HeartHandshake size={26} /> },
];

const cloudValues = [
  "Transformative",
  "Technology",
  "Evolve",
  "Innovative",
  "Adaptive",
  "Proactive",
  "People",
  "Culture",
  "Relentless",
  "Always switch on never off",
  "Inclusive",
  "Bridging",
  "Global",
];

const AboutUsPage = () => {
  const [view, setView] = useState("wheel");
  const canvasRef = useRef(null);
  const rotationRef = useRef(0);

  const whatWeDoItems = [
    {
      title: "AI Data Solutions",
      description: "Global champion in advanced data processing and AI integration.",
    },
    {
      title: "Speed & Efficiency",
      description: "Delivering projects rapidly for large global organizations.",
    },
    {
      title: "Multilingual Projects",
      description: "Expertise in producing solutions across multiple languages.",
    },
    {
      title: "Innovation Culture",
      description: "Fostering groundbreaking ideas and sustainable practices.",
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // DNA cloud loop fix
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--word-count",
      cloudValues.length
    );
  }, []);

  // Draw ecosystem network
  useEffect(() => {
    if (view !== "wheel") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 160;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      rotationRef.current += 0.002;

      ecosystemNodes.forEach((node, i) => {
        const angle1 =
          (i / ecosystemNodes.length) * 2 * Math.PI + rotationRef.current;
        const x1 = centerX + radius * Math.cos(angle1);
        const y1 = centerY + radius * Math.sin(angle1);

        ecosystemNodes.forEach((_, j) => {
          if (i !== j) {
            const angle2 =
              (j / ecosystemNodes.length) * 2 * Math.PI + rotationRef.current;
            const x2 = centerX + radius * Math.cos(angle2);
            const y2 = centerY + radius * Math.sin(angle2);

            ctx.beginPath();
            ctx.strokeStyle = "rgba(0, 86, 59, 0.2)";
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, [view]);

  return (
    <motion.div
      className="about-page"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <section className="hero">
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          About Lifewood
        </motion.h1>
      </section>

      {/* What We Do */}
      <motion.section
        className="what-we-do-section"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2>What We Do Best</h2>
        <div className="what-we-do-grid">
          {whatWeDoItems.map((item, index) => (
            <motion.div
              key={index}
              className="what-we-do-card"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 8px 18px rgba(0, 0, 0, 0.15)",
              }}
            >
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Vision */}
      <motion.section
        className="info-section alt-bg"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2>Our Vision</h2>
        <p>
          To be the global champion in AI data solutions, igniting a culture of
          innovation and sustainability that enriches lives and transforms
          communities worldwide.
        </p>
      </motion.section>

      {/* Mission */}
      <motion.section
        className="info-section"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2>Our Mission</h2>
        <p>
          To develop and deploy cutting edge AI technologies that solve
          real-world problems, empower communities, and advance sustainable
          practices. We are committed to fostering a culture of innovation,
          collaborating with stakeholders across sectors, and making a
          meaningful impact on society and the environment.
        </p>
      </motion.section>

      {/* Identity */}
      <motion.section
        className="info-section alt-bg"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2>What makes Lifewood, Lifewood?</h2>
        <p>
          We are more than just a company. At our core, we define and
          communicate our identity, both internally to our global teams and
          externally to our clients, investors, stakeholders, and friends spread
          across the world. We bridge ASEAN and China, leveraging advanced
          technology to foster harmony, trust, and cooperation.
        </p>
        <p>
          Our vast data resources and strong emphasis on ESG principles,
          including empowering women and people with disabilities, showcase our
          commitment to positive change and impactful innovation.
        </p>
      </motion.section>

      {/* Core Values */}
      <section className="core-values-section">
        <div className="core-values-header">
          <h2>Our Core Values</h2>
          <div className="toggle-buttons">
            <button
              className={view === "wheel" ? "active" : ""}
              onClick={() => setView("wheel")}
            >
              Ecosystem
            </button>
            <button
              className={view === "cloud" ? "active" : ""}
              onClick={() => setView("cloud")}
            >
              Brand DNA
            </button>
          </div>
        </div>

        {view === "wheel" && (
          <div className="ecosystem-container">
            <canvas
              ref={canvasRef}
              width={500}
              height={500}
              className="ecosystem-canvas"
            />
            <div className="ecosystem-nodes">
              {ecosystemNodes.map((node, i) => {
                const angle =
                  (i / ecosystemNodes.length) * 2 * Math.PI +
                  rotationRef.current;
                const radius = 160;
                const x = 250 + radius * Math.cos(angle);
                const y = 250 + radius * Math.sin(angle);

                return (
                  <div
                    key={node.id}
                    className="ecosystem-node"
                    style={{ left: `${x}px`, top: `${y}px` }}
                  >
                    <div className="node-icon">{node.icon}</div>
                    <span>{node.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {view === "cloud" && (
          <div className="core-values-cloud">
            <div className="dna-helix">
              <div className="dna-track">
                {[...cloudValues, ...cloudValues].map((word, i) => (
                  <span
                    key={i}
                    className="dna-word"
                    style={{
                      animationDelay: `${i * 0.4}s`, // stagger rotation only
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Strategies */}
      <section className="section strategies">
        <h2>Thoughtful Digital Strategies</h2>
        <div className="strategy-grid">
          <div className="strategy-card">
            <FaRocket className="icon" />
            <h3>Innovation</h3>
            <p>Delivering tailored digital solutions.</p>
          </div>
          <div className="strategy-card">
            <FaUsers className="icon" />
            <h3>Engagement</h3>
            <p>Driving growth & fulfilling services.</p>
          </div>
          <div className="strategy-card">
            <FaHandshake className="icon" />
            <h3>Support</h3>
            <p>24/7 customer assistance & care.</p>
          </div>
          <div className="strategy-card">
            <FaGlobe className="icon" />
            <h3>Reach</h3>
            <p>Connecting businesses worldwide.</p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutUsPage;
