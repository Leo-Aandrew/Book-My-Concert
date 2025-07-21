import React, { useState, useEffect } from "react";
import axios from "axios";

const EditProfile = ({ onNameUpdate }) => {
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
  const fetchUser = async () => {
    const email = JSON.parse(localStorage.getItem("user"))?.email;
    if (!email) return;

    try {
      const res = await axios.get(`http://localhost:8000/api/auth/users/${email}`);
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };
  fetchUser();
}, []);


  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
  const email = JSON.parse(localStorage.getItem("user"))?.email;
  if (!email) return;

  try {
    const res = await axios.put(`http://localhost:8000/api/auth/users/${email}`, {
      name: user.name,
    });
    
    localStorage.setItem("user", JSON.stringify(res.data));
    alert("Profile updated!");

     // 👇 Update dashboard if callback exists
    if (typeof onNameUpdate === "function") {
      onNameUpdate(res.data.name);
    }
  } catch (err) {
    console.error("Failed to update profile:", err);
    alert("Failed to update profile");
  }
};


  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "400px",
        margin: "2rem auto",
        backgroundColor: "#1e1e2f",
        color: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" , color: "#4fc3f7"}}>Edit Profile</h2>

      <label style={{ display: "block", marginBottom: "0.5rem" }}>Name:</label>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Enter your name"
        style={{
          width: "100%",
          padding: "0.5rem",
          borderRadius: "5px",
          border: "none",
          marginBottom: "1rem",
          backgroundColor: "#2d2d44",
          color: "#fff",
        }}
      />

      <label style={{ display: "block", marginBottom: "0.5rem" }}>Email:</label>
      <input
        type="email"
        name="email"
        value={user.email}
        readOnly
        disabled
        style={{
          width: "100%",
          padding: "0.5rem",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#2d2d44",
          color: "#aaa",
          cursor: "not-allowed",
          marginBottom: "1.5rem",
        }}
      />

      <button
        onClick={handleSave}
        style={{
          width: "100%",
          padding: "0.8rem",
          border: "none",
          borderRadius: "5px",
          backgroundColor: "#4fc3f7",
          color: "#000",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditProfile;
