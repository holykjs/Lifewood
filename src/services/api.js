import axios from "axios";

// Prefer env-defined API URL in production. For Vite, use VITE_* vars.
const apiBaseUrl =
  import.meta?.env?.VITE_API_URL?.trim() ||
  (typeof window !== "undefined" && window.location.origin.includes("localhost")
    ? "http://localhost:5000/api"
    : "/api");

const API = axios.create({ baseURL: apiBaseUrl });

// Attach JWT token if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
