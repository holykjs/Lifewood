import { Link } from "react-router-dom";
import "../styles/AdminLayout.css";
import logo from "../assets/logo.png";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-logo">
          <img src={logo} alt="Admin Logo" className="admin-logo-img" />
        </div>
        <nav className="admin-nav">
          <Link to="/admin/logout" className="admin-nav-link logout">
            Logout
          </Link>
        </nav>
      </header>

      {/* Page Content */}
      <main className="admin-content">{children}</main>
    </div>
  );
};

export default AdminLayout;