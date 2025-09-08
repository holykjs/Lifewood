import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import HomePage from './pages/HomePage';
import ApplicationFormPage from './pages/ApplicationFormPage';
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import NavBar from "./components/NavBar";
import { colors } from './colors'; 
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import Logout from "./pages/Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";
import '@fortawesome/fontawesome-free/css/all.min.css';

import './App.css';

function AppContent() {
  const location = useLocation();

  // Hide Header & Footer on admin pages
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <NavBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/apply" element={<ApplicationFormPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/courses" element={<ProjectsPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/logout" element={<Logout />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      {!isAdminRoute}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;