import React, { useState } from "react";
import ConcertManager from "./ConcertManager";
import BookingReports from "./BookingReports";
import "../styles/AdminPage.css";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("concerts");

  return (
    <div className="admin-panel">
      <h2>Admin Dashboard</h2>

      <div className="admin-tabs">
        <button
          className={activeTab === "concerts" ? "active" : ""}
          onClick={() => setActiveTab("concerts")}
        >
          Manage Concerts
        </button>
        <button
          className={activeTab === "bookings" ? "active" : ""}
          onClick={() => setActiveTab("bookings")}
        >
          Booking Reports
        </button>
      </div>

      <div className="admin-content">
        {activeTab === "concerts" ? <ConcertManager /> : <BookingReports />}
      </div>
    </div>
  );
};

export default AdminPanel;
