import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Invalidate browser cache for protected routes to avoid back-button showing stale content
  useEffect(() => {
    if (!token) return;
    try {
      if ("caches" in window) {
        caches.keys().then((names) => names.forEach((n) => caches.delete(n)));
      }
    } catch {}
  }, [token]);

  return token ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
