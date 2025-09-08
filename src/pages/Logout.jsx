import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      localStorage.removeItem("token");
      // Prevent navigating back to a cached protected page
      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", () => {
        navigate("/admin/login", { replace: true });
      });
    } finally {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  return null;
};

export default Logout;


