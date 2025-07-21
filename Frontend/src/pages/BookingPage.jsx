import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/BookingPage.css";

const BookingPage = () => {
  const { id } = useParams(); 
  const [concert, setConcert] = useState(null);
  const [ticketType, setTicketType] = useState("standard");
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchConcert = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/concerts/${id}`);
        setConcert(res.data);
      } catch (err) {
        console.error("Failed to fetch concert:", err);
      }
    };
    fetchConcert();
  }, [id]);

  const handleBooking = async () => {
    if (!concert) return;
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    const available = concert.availableTickets?.[ticketType];
    if (quantity > available) {
      alert(`Only ${available} ${ticketType} tickets available.`);
      return;
    }

    const bookingDetails = {
      concertId: concert._id,
      artist: concert.artist,
      venue: concert.venue,
      location: concert.location,
      ticketType,
      quantity,
      totalPrice: quantity * concert.ticketPrice[ticketType],
      bookedBy: JSON.parse(localStorage.getItem("user"))?.email || "Guest",
      paymentMethod,
      date: new Date().toISOString(),
    };

    const updatedTickets = {
      ...concert.availableTickets,
      [ticketType]: available - quantity,
    };

    setIsSubmitting(true);
    try {
  
      await axios.post("http://localhost:8000/bookings", bookingDetails);


      await axios.patch(`http://localhost:8000/concerts/${concert._id}`, {
        availableTickets: updatedTickets,
      });

      alert("Booking successful 🎉");
      navigate("/confirmation", { state: { booking: bookingDetails } });
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!concert) return <div className="booking-page">Loading concert...</div>;

  return (
    <div className="booking-page">
      <div className="booking-box">
        <h2>Book Tickets for {concert.artist}</h2>
        <p><strong>Venue:</strong> {concert.venue}, {concert.location}</p>
        <p><strong>Date & Time:</strong> {concert.date} | {concert.time}</p>

        <div className="form-group">
          <label>Ticket Type:</label>
          <select value={ticketType} onChange={(e) => setTicketType(e.target.value)}>
            <option value="standard">Standard – ₹{concert.ticketPrice.standard}</option>
            <option value="vip">VIP – ₹{concert.ticketPrice.vip}</option>
          </select>
        </div>

        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            min="1"
            max={concert.availableTickets?.[ticketType]}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <p className="available">Available: {concert.availableTickets?.[ticketType]} tickets</p>
        </div>

        <div className="form-group">
          <label><strong>Select Payment Method:</strong></label>
          <div className="payment-options">
            {["GPay", "PhonePe", "NetBanking"].map((method) => (
              <label
                key={method}
                className={`payment-logo-wrapper ${paymentMethod === method ? "selected" : ""}`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ display: "none" }}
                />
                <img
                  src={`/assets/${method.toLowerCase()}.png`}
                  alt={method}
                  className="payment-logo-circle"
                />
              </label>
            ))}
          </div>
        </div>

        <button className="book-btn" onClick={handleBooking} disabled={isSubmitting}>
          {isSubmitting ? "Booking..." : "Book Now"}
        </button>
      </div>
    </div>
  );
};

export default BookingPage;
