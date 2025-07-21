import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BookingList.css";

const BookingList = ({ bookings }) => {
  const navigate = useNavigate();

  const handleViewTicket = (booking) => {
    navigate("/mobile-ticket", { state: { booking } });
  };

  return (
    <div className="booking-list">
      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="booking-cards">
          {bookings.map((booking) => (
            <div className="booking-card" key={booking._id || booking.id}>

              
              <p><span style={{color: '#4fc3f7'}}>Aritist:</span> {booking.artist}</p>
              <p><span style={{color: '#4fc3f7'}}>Date:</span> {new Date(booking.date).toLocaleString()}</p>
              <p><span style={{color: '#4fc3f7'}}>Type:</span> {booking.ticketType}</p>
              <p><span style={{color: '#4fc3f7'}}>Quantity:</span> {booking.quantity}</p>
              <p><span style={{color: '#4fc3f7'}}>Payment:</span> {booking.paymentMethod}</p>
              <p><span style={{color: '#4fc3f7'}}>Paid:</span> ₹{booking.totalPrice}</p>

              <button className="view-btn" onClick={() => handleViewTicket(booking)}>
                View Ticket
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingList;
