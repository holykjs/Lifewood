import "../styles/Footer.css";
import { motion } from "framer-motion";

const Footer = () => {
  const socialLinks = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/yourprofile" },
    { name: "GitHub", url: "https://github.com/yourprofile" },
    { name: "Twitter", url: "https://twitter.com/yourprofile" },
    // Add more social links as needed
  ];

  return (
    <motion.footer
      className="app-footer" // Renamed class to avoid generic 'footer'
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="footer-content-wrapper">
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} Lifewood. All rights reserved.
        </p>

        <div className="footer-social-links">
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank" // Open in new tab
              rel="noopener noreferrer" // Security best practice
              className="footer-social-link"
              whileHover={{ scale: 1.1, color: "#FFD166" }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Link to ${link.name}`}
            >
              {link.name}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;