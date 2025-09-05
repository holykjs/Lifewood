import React from "react";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import "../styles/home.css";
import "../styles/global.css";
import heroImage from "../assets/background.png";

const HomePage = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div className="homepage">

      {/* Hero Section */}
      <section className="hero-section">
        <div
          className="hero-background"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="hero-content">
            <h1 className="hero-title">
              Powering Tomorrow with <span className="hero-highlight">Intelligent</span> Data
            </h1>
            <p className="hero-subtitle">
              Lifewood is a global champion in AI data solutions, igniting innovation and sustainability worldwide.
            </p>
            <button className="cta-button" onClick={() => navigate("/apply")}>
              Join Our Innovation Journey
            </button>
        </div>
      </section>

      <section className="global-scale-section section alt-bg">
        <div className="global-scale-globe"></div>
        <div className="global-scale-content" ref={ref}>

            {/* Tagline */}
            <div className="global-scale-tagline">
                Always On Never Off
            </div>

            {/* Stats */}
            <div className="global-scale-stats">
            <div className="stat">
                <h2>{inView && <CountUp start={0} end={34000} duration={2} separator="," />}</h2>
                <p>ONLINE WORKFORCE</p>
            </div>
            <div className="stat">
                <h2>{inView && <CountUp start={0} end={50} duration={2} />}</h2>
                <p>DELIVERY SITES</p>
            </div>
            <div className="stat">
                <h2>{inView && <CountUp start={0} end={30} duration={2} />}</h2>
                <p>COUNTRIES ON 4 CONTINENTS</p>
            </div>
            <div className="stat">
                <h2>{inView && <CountUp start={0} end={100} duration={2} />}</h2>
                <p>LANGUAGE CAPABILITIES</p>
            </div>
            </div>

            {/* Description */}
            <p className="global-scale-description fade-in-up">
            Lifewood, active in 30 countries from locations as diverse as Benin and Britain, Singapore and Seattle, drives ever forward, igniting a culture of innovation, building bridges, and forming new friendships in the ceaseless motion of business and the unlimited possibilities of AI and GPT — creating dynamic opportunities and prosperous communities around the world.
            </p>

        </div>
        </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <h3>Lifewood</h3>
          <p>Empowering communities through technology and human potential.</p>
          <div className="footer-links">
            <a href="/about">About Us</a>
          </div>
          <div className="footer-socials">
            <a href="https://www.facebook.com/LifewoodPH/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <p className="footer-copy">© {new Date().getFullYear()} Lifewood. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
