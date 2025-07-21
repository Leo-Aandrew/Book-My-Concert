import React, { useEffect, useState } from "react";
import axios from "axios";
import BookingList from "./BookingList";
import EditProfile from "./EditProfile";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("bookings");
  const [userName, setUserName] = useState("User");

  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const email = user?.email;

  if (user?.name) {
    setUserName(user.name);
  }

  if (email) {
    // fetch full user info from backend
    axios
      .get(`http://localhost:8000/api/auth/users/${email}`)
      .then((res) => {
        setUserName(res.data.name);
      })
      .catch((err) => {
        console.warn("Failed to fetch user details:", err);
      });

    // fetch bookings for this user
    axios
      .get(`http://localhost:8000/bookings?bookedBy=${email}`)
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch bookings:", err);
      });
  }
}, []);


  const handleCancel = async (id) => {
  const confirm = window.confirm("Are you sure you want to cancel this ticket?");
  if (!confirm) return;

  try {
    await axios.delete(`http://localhost:8000/bookings/${id}`);
    setBookings((prev) => prev.filter((b) => b._id !== id)); // use _id if MongoDB
    alert("Ticket cancelled.");
  } catch (err) {
    console.error(err);
    alert("Cancellation failed.");
  }
};


  return (
    <div className="dashboard-container">
      <h3>👋 Welcome, {userName}</h3>

      <div className="tab-buttons">
        <button
          className={activeTab === "bookings" ? "active" : ""}
          onClick={() => setActiveTab("bookings")}
        >
          My Bookings
        </button>
        <button
          className={activeTab === "profile" ? "active" : ""}
          onClick={() => setActiveTab("profile")}
        >
          Edit Profile
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "bookings" ? (
          <BookingList bookings={bookings} onCancel={handleCancel} />
        ) : (
          <EditProfile onNameUpdate={(newName) => setUserName(newName)}/>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
