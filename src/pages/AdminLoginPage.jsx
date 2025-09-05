import React, { useState } from "react";
import { Eye, EyeOff, Shield } from "lucide-react"; // simple icons
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

const AdminLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await API.post("/auth/login", { username, password });
      localStorage.setItem("token", data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-card fade-in">
        <div className="admin-icon">
          <Shield size={50} />
        </div>
        <h1 className="admin-title">Admin Portal</h1>
        <p className="admin-subtitle">Secure login to dashboard</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="admin-form">
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </label>

          <label>
            Password
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          <button type="submit" className="admin-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
