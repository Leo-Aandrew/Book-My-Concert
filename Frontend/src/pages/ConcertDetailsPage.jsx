import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ConcertDetailsPage.css";

const ConcertDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [concert, setConcert] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchConcert = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/concerts/${id}`);
        setConcert(response.data);
      } catch (err) {
        console.error("Error fetching concert:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchConcert();
  }, [id]);

  if (!user) {
    return (
      <div className="concert-details-page">
        <h2>Please login to view concert details 🎫</h2>
      </div>
    );
  }

  if (isLoading) return <div className="concert-details-page">Loading...</div>;
  if (!concert) return <div className="concert-details-page">Concert not found</div>;

  return (
    <div className="concert-details-page">
      {/* 🎤 Banner Background */}
      <div
        className="concert-hero"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1)), url("/assets/hiphop.jpeg")`,
        }}
      >
        <div className="concert-hero-content">
          <h1>{concert.artist}</h1>
          <p>{concert.genre} • {concert.location} • {concert.date}</p>
          <p><strong>Venue:</strong> {concert.venue}</p>
          <p><strong>Time:</strong> {concert.time}</p>
          <p><strong>Standard:</strong> ₹{concert.ticketPrice.standard}</p>
          <p><strong>VIP:</strong> ₹{concert.ticketPrice.vip}</p>
          <button className="book-btn" onClick={() => navigate(`/book/${concert._id}`)}>
            Book Tickets
          </button>
        </div>
      </div>

      {/* 🎵 About Section */}
      <div className="concert-details-container">
        <h2>About the Concert</h2>
        <p>"Get ready to groove! This concert features top-notch music, high energy, and a night you won’t forget.
Experience electrifying live performances, breathtaking stage effects, and an atmosphere filled with rhythm and excitement.
Whether you're a die-hard fan or just love great music, this show promises non-stop entertainment and unforgettable memories.
Come sing, dance, and celebrate music like never before — this is more than a concert, it’s an experience of a lifetime!"</p>
      </div>
    </div>
  );
};

export default ConcertDetailsPage;
