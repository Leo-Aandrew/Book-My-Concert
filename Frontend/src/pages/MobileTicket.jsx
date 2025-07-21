import React, { useRef } from "react";
import html2canvas from "html2canvas";
import QRCode from "react-qr-code";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/MobileTicket.css";

const MobileTicket = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location?.state?.booking;

  const ticketRef = useRef();
  const ticketId = booking._id?.slice(-6).toUpperCase() || "123456";

  if (!booking) {
    return (
      <div className="ticket-container">
        <h2>Booking not found</h2>
        <button onClick={() => navigate("/")}>Go to Home</button>
      </div>
    );
  }

  const bookingDate = new Date(booking?.date).toLocaleString();

  const downloadTicket = () => {
    html2canvas(ticketRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = `${ticketId}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <div className="ticket-wrapper">
      <div className="ticket-scroll-container">
      <div className="ticket-horizontal" ref={ticketRef}>
        {/* LEFT SIDE - QR and ID */}
        <div className="ticket-left">
          <div className="ticket-number">{ticketId}</div>
          <div className="qr-box">
            <QRCode value={JSON.stringify({ id: booking._id, email: booking.bookedBy })} />
          </div>
          <small className="ticket-note">
            Entry Pass for {booking.artist} | Valid on {booking.date}
            {booking.time ? ` – ${booking.time}` : ""}
          </small>

        </div>

        {/* RIGHT SIDE - Details */}
        <div className="ticket-right">
          <div className="concert-title">{booking.artist}</div>
          <div className="concert-tour">Live Concert</div>
          <div className="concert-datetime">
            {booking.date} | {booking.time}
          </div>
          <div className="concert-venue">{booking.venue || "Venue not provided"}</div>
          <div className="concert-info">
            Seat: <b>{booking.ticketType.toUpperCase()}</b> | Tickets:{" "}
            <b>{booking.quantity}</b>
          </div>
          <div className="concert-total">Total: ₹{booking.totalPrice}</div>
        </div>
      </div>
      </div>
      <button className="download-btn" onClick={downloadTicket}>
        Download Ticket
      </button>

    </div>
  );
};

export default MobileTicket;
