import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ConcertManager.css";

const initialConcert = {
  artist: "",
  date: "",
  time: "",
  venue: "",
  location: "",
  genre: "",
  image: "",
  ticketPrice: { standard: 0, vip: 0 },
  availableTickets: { standard: 0, vip: 0 },
};

const ConcertManager = () => {
  const [concerts, setConcerts] = useState([]);
  const [formData, setFormData] = useState(initialConcert);
  const [editingId, setEditingId] = useState(null);


  const fetchConcerts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/concerts");
      setConcerts(res.data);
    } catch (error) {
      console.error("Error fetching concerts:", error);
    }
  };

  useEffect(() => {
    fetchConcerts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("ticketPrice.")) {
      setFormData((prev) => ({
        ...prev,
        ticketPrice: {
          ...prev.ticketPrice,
          [name.split(".")[1]]: Number(value),
        },
      }));
    } else if (name.startsWith("availableTickets.")) {
      setFormData((prev) => ({
        ...prev,
        availableTickets: {
          ...prev.availableTickets,
          [name.split(".")[1]]: Number(value),
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };



const handleSubmit = async () => {
  try {
    const form = new FormData();

    for (let key in formData) {
      if (
        typeof formData[key] === "object" &&
        !Array.isArray(formData[key]) &&
        !(formData[key] instanceof File) 
      ) {
        for (let subKey in formData[key]) {
          form.append(`${key}.${subKey}`, formData[key][subKey]);
        }
      } else if (!(formData[key] instanceof File)) {
        form.append(key, formData[key]);
      }
    }


    if (formData.image instanceof File) {
      form.append("image", formData.image);
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    if (editingId) {
      await axios.put(`http://localhost:8000/concerts/${editingId}`, form, config);
      alert("Concert updated");
    } else {
      await axios.post("http://localhost:8000/concerts", form, config);
      alert("Concert added");
    }

    setFormData(initialConcert);
    setEditingId(null);
    fetchConcerts();
  } catch (error) {
    console.error("Upload error:", error);
  }
};


  const handleEdit = (concert) => {
    setFormData(concert);
    setEditingId(concert._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this concert?")) return;

    try {
      await axios.delete(`http://localhost:8000/concerts/${id}`);
      alert("Concert deleted.");
      fetchConcerts();
    } catch (error) {
      console.error("Error deleting concert:", error);
    }
  };

  return (
    <div className="concert-manager">
      <h3>{editingId ? "Edit Concert" : "Add New Concert"}</h3>

      <div className="concert-form">
        <label>Artist Name</label>
        <input name="artist" value={formData.artist} onChange={handleChange} />

        <label>Date</label>
        <input name="date" type="date" value={formData.date} onChange={handleChange} />

        <label>Time</label>
        <input name="time" type="time" value={formData.time} onChange={handleChange} />

        <label>Venue</label>
        <input name="venue" value={formData.venue} onChange={handleChange} />

        <label>Location</label>
        <input name="location" value={formData.location} onChange={handleChange} />

        <label>Genre</label>
        <input name="genre" value={formData.genre} onChange={handleChange} />

        <label>Upload Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
        />


        <label>Ticket Price (Standard)</label>
        <input name="ticketPrice.standard" type="number" value={formData.ticketPrice.standard} onChange={handleChange} />

        <label>Ticket Price (VIP)</label>
        <input name="ticketPrice.vip" type="number" value={formData.ticketPrice.vip} onChange={handleChange} />

        <label>Available Tickets (Standard)</label>
        <input name="availableTickets.standard" type="number" value={formData.availableTickets.standard} onChange={handleChange} />

        <label>Available Tickets (VIP)</label>
        <input name="availableTickets.vip" type="number" value={formData.availableTickets.vip} onChange={handleChange} />

        <button onClick={handleSubmit} className="submit-btn">
          {editingId ? "Update Concert" : "Add Concert"}
        </button>
      </div>

      <h3 className="concerts-heading">All Concerts</h3>
      <div className="concert-list">
        {concerts.map((concert) => (
          <div key={concert._id} className="concert-card">
            <div className="concert-details">
              <div className="concert-header">
                <h3>{concert.artist}</h3>
             
              </div>
              <p><span style={{color: '#4fc3f7'}}>Date:</span> {concert.date} at {concert.time}</p>
              <p><span style={{color: '#4fc3f7'}}>Venue:</span> {concert.venue}, {concert.location}</p>
              <p><span style={{color: '#4fc3f7'}}>Genre:</span> {concert.genre}</p>
              <p><span style={{color: '#4fc3f7'}}>Prices:</span> Std ₹{concert.ticketPrice?.standard} | VIP ₹{concert.ticketPrice?.vip}</p>
              <p><span style={{color: '#4fc3f7'}}>Available:</span> Std {concert.availableTickets?.standard}, VIP {concert.availableTickets?.vip}</p>
            </div>
            <div className="concert-actions">
              <button onClick={() => handleEdit(concert)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(concert._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConcertManager;
