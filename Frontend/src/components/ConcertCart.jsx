import React from "react";
import { Link } from "react-router-dom";
import "../styles/ConcertCard.css";

const ConcertCard = ({ concert }) => {
  const isLoggedIn = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="concert-card">
      <img
        className="concert-img"
        src={`http://localhost:8000${concert.image}`}
        alt={concert.artist}
      />

      <div className="concert-info">
        <h3>{concert.artist}</h3>
        <p className="venue">{concert.venue} - {concert.location}</p>
        <p className="datetime">{concert.date} | {concert.time}</p>
        <p className="prices">
          🎫 Standard: ₹{concert.ticketPrice.standard} | VIP: ₹{concert.ticketPrice.vip}
        </p>

        {isLoggedIn ? (
          <Link to={`/concerts/${concert._id}`} className="details-button">
            View Details
          </Link>
        ) : (
          <Link to="/login" className="details-button">
            View Details
          </Link>
        )}
      </div>
    </div>
  );
};

export default ConcertCard;
