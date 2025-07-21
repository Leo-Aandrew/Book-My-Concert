import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ConfirmationPage.css";

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location?.state?.booking;

  const handleViewTicket = () => {
    navigate("/mobile-ticket", { state: { booking } });
  };

  const sendEmail = () => {
    if (!booking?.bookedBy) return alert("No email found for this booking.");

    const bookingDate = new Date(booking.date).toLocaleString();
    const body = `
Ticket Details:
Artist: ${booking.artist}
Type: ${booking.ticketType}
Quantity: ${booking.quantity}
Paid: ₹${booking.totalPrice}
Payment Method: ${booking.paymentMethod}
Booked By: ${booking.bookedBy}
Booking Date: ${bookingDate}
    `;

    const mailto = `mailto:${encodeURIComponent(
      booking.bookedBy
    )}?subject=Your Ticket&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  };

  if (!booking) {
    return (
      <div className="confirmation-page">
        <div className="confirmation-box">
          <h2>❌ No booking information found</h2>
          <button onClick={() => navigate("/")}>Go Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmation-page">
      <div className="confirmation-box">
        <h2>🎉 Booking Confirmed!</h2>
        <p>Thank you for booking with us. You can now:</p>

        <div className="button-group">
          <button className="view-ticket-btn" onClick={handleViewTicket}>
            View Ticket
          </button>
          <button className="email-btn" onClick={sendEmail}>
            Email Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
