import React, { useEffect, useState } from "react";
import API from "../services/api";
import AdminLayout from "../components/AdminLayout";
import "../styles/admin.css";

const statusColors = {
  Pending: "#FFC107",
  Reviewed: "#17A2B8",
  Accepted: "#28A745",
  Rejected: "#DC3545",
};

const AdminDashboardPage = () => {
  const [applications, setApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success");
  const [confirmAction, setConfirmAction] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [activeTab, setActiveTab] = useState("personal"); // new for modal tabs

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const { data } = await API.get("/applications");
    setApplications(data);
  };

  const handleDelete = (id) => {
    setPopupMessage("Are you sure you want to delete this application?");
    setPopupType("confirm");
    setShowPopup(true);
    setConfirmAction(() => async () => {
      await API.delete(`/applications/${id}`);
      fetchApplications();
      setShowPopup(false);
      showAutoPopup("✅ Application deleted successfully!", "success");
    });
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await API.put(`/applications/${id}`, { status: newStatus });
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status: newStatus } : app
        )
      );
      showAutoPopup("✅ Status updated and email sent!", "success");
    } catch (error) {
      console.error("Error saving application:", error);
      showAutoPopup("❌ Failed to update status. Please try again.", "error");
    }
  };

  const showAutoPopup = (message, type = "success") => {
    setPopupMessage(message);
    setPopupType(type);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2500);
  };

  const filteredApplications = applications.filter((app) => {
    const fullName = `${app.firstName} ${app.lastName}`.toLowerCase();
    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.projectAppliedFor.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <AdminLayout>
      <div style={{ padding: "20px" }}>
        <h1 className="dashboard-title">Admin Dashboard</h1>

        {/* ✅ Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card pending">
            <h3>{applications.filter((a) => a.status === "Pending").length}</h3>
            <p>Pending</p>
          </div>
          <div className="stat-card reviewed">
            <h3>{applications.filter((a) => a.status === "Reviewed").length}</h3>
            <p>Reviewed</p>
          </div>
          <div className="stat-card accepted">
            <h3>{applications.filter((a) => a.status === "Accepted").length}</h3>
            <p>Accepted</p>
          </div>
          <div className="stat-card rejected">
            <h3>{applications.filter((a) => a.status === "Rejected").length}</h3>
            <p>Rejected</p>
          </div>
        </div>

        {/* ✅ Search Bar */}
        <input
          type="text"
          placeholder="Search by name, email, or project..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        {/* ✅ Applications Table */}
        <div className="table-container">
          <table className="styled-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Project</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app, index) => (
                <tr key={app._id}>
                  <td>{index + 1}</td>
                  <td>{`${app.firstName} ${app.lastName}`}</td>
                  <td>{app.projectAppliedFor}</td>
                  <td>{app.email}</td>
                  <td>
                    <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app._id, e.target.value)}
                        className="status-dropdown"
                        style={{
                        background: statusColors[app.status] || "#ccc",
                        }}
                    >
                        <option value="Pending" style={{ background: statusColors.Pending }}>
                        Pending
                        </option>
                        <option value="Reviewed" style={{ background: statusColors.Reviewed }}>
                        Reviewed
                        </option>
                        <option value="Accepted" style={{ background: statusColors.Accepted }}>
                        Accepted
                        </option>
                        <option value="Rejected" style={{ background: statusColors.Rejected }}>
                        Rejected
                        </option>
                    </select>
                    </td>
                  <td style={{ display: "flex", gap: "5px" }}>
                    <button
                      onClick={() => {
                        setSelectedApplication(app);
                        setActiveTab("personal");
                      }}
                      className="btn btn-view"
                    >
                      👁 View
                    </button>
                    <button
                      onClick={() => handleDelete(app._id)}
                      className="btn btn-danger"
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ Application Detail Modal with Tabs */}
        {selectedApplication && (
          <div className="modal-overlay">
            <div className="modal-box profile-modal">
              <div className="profile-header">
                <div className="profile-avatar">
                  {selectedApplication.firstName.charAt(0)}
                  {selectedApplication.lastName.charAt(0)}
                </div>
                <h2>
                  {selectedApplication.firstName} {selectedApplication.lastName}
                </h2>
                <p className="profile-email">{selectedApplication.email}</p>
              </div>

              {/* Tabs */}
              <div className="tabs">
                <button
                  className={activeTab === "personal" ? "active" : ""}
                  onClick={() => setActiveTab("personal")}
                >
                  Personal
                </button>
                <button
                  className={activeTab === "education" ? "active" : ""}
                  onClick={() => setActiveTab("education")}
                >
                  Education
                </button>
                <button
                  className={activeTab === "application" ? "active" : ""}
                  onClick={() => setActiveTab("application")}
                >
                  Application
                </button>
              </div>

              {/* Tab Content */}
              <div className="profile-details">
                {activeTab === "personal" && (
                  <>
                    <div>
                      <strong>🎂 Age:</strong> {selectedApplication.age || "-"}
                    </div>
                    <div>
                      <strong>📧 Email:</strong> {selectedApplication.email}
                    </div>
                  </>
                )}
                {activeTab === "education" && (
                  <>
                    <div>
                      <strong>🎓 Degree:</strong>{" "}
                      {selectedApplication.degree || "-"}
                    </div>
                    <div>
                      <strong>💼 Experience:</strong>{" "}
                      {selectedApplication.relevantExperience || "-"}
                    </div>
                  </>
                )}
                {activeTab === "application" && (
                  <>
                    <div>
                      <strong>📌 Project:</strong>{" "}
                      {selectedApplication.projectAppliedFor}
                    </div>
                    <div>
                      <strong>📄 Resume:</strong>{" "}
                      {selectedApplication.resume ? (
                        <a
                          href={
                            selectedApplication.resume.startsWith("http")
                              ? selectedApplication.resume
                              : `https://${selectedApplication.resume}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="resume-link"
                        >
                          View Resume
                        </a>
                      ) : (
                        "No Resume"
                      )}
                    </div>
                    <div>
                      <strong>📊 Status:</strong> {selectedApplication.status}
                    </div>
                  </>
                )}
              </div>

              {/* Modal Actions */}
              <div className="modal-actions">
                <button
                  className="btn btn-success"
                  onClick={() =>
                    handleStatusChange(selectedApplication._id, "Accepted")
                  }
                >
                  ✅ Accept
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() =>
                    handleStatusChange(selectedApplication._id, "Rejected")
                  }
                >
                  ❌ Reject
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedApplication(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ✅ Popup Modal */}
        {showPopup && (
          <div className="popup-overlay">
            <div className={`popup-box ${popupType}`}>
              <h3>
                {popupType === "success" && "✅ Success"}
                {popupType === "error" && "❌ Error"}
                {popupType === "confirm" && "⚠️ Confirm"}
              </h3>
              <p>{popupMessage}</p>

              {popupType === "confirm" ? (
                <div className="popup-actions">
                  <button className="popup-btn" onClick={() => confirmAction()}>
                    Yes
                  </button>
                  <button
                    className="popup-btn cancel"
                    onClick={() => setShowPopup(false)}
                  >
                    No
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
