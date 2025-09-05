import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "../styles/NavBar.css";
import logo from "../assets/logo.png";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/courses" },
    { name: "About us", path: "/about" },
  ];

  return (
    <header className="navbar-header">
      {/* Logo */}
      <Link to="/" className="navbar-logo">
        <img src={logo} alt="Lifewood Logo" />
      </Link>

      {/* Desktop and Mobile Nav */}
      <nav className={`navbar-nav ${isOpen ? "open" : ""}`}>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={location.pathname === link.path ? "active" : ""}
            onClick={() => setIsOpen(false)}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Mobile Toggle Button */}
      <button
        className="navbar-menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
    </header>
  );
};

export default NavBar;