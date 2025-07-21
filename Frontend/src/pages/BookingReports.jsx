import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/BookingReports.css";

const BookingReports = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:8000/bookings");
        setBookings(res.data);
        setFilteredBookings(res.data);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    const lower = filter.toLowerCase();
    const filtered = bookings.filter(
      (b) =>
        b.artist.toLowerCase().includes(lower) ||
        b.bookedBy.toLowerCase().includes(lower)
    );
    setFilteredBookings(filtered);
  }, [filter, bookings]);

  const groupedStats = filteredBookings.reduce((acc, curr) => {
    if (!acc[curr.artist]) {
      acc[curr.artist] = { tickets: 0, revenue: 0 };
    }
    acc[curr.artist].tickets += curr.quantity;
    acc[curr.artist].revenue += curr.totalPrice;
    return acc;
  }, {});

  return (
    <div className="booking-reports">
      <h3>Booking Reports</h3>

      <input
        type="text"
        placeholder="Filter by artist or user email"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {loading ? (
        <p>Loading booking data...</p>
      ) : (
        <>
          <div className="stats-section">
            {Object.entries(groupedStats).map(([artist, data]) => (
              <div className="stat-card" key={artist}>
                <h3>{artist}</h3>
                <p> <span style={{color: "#7dd3fc"}}>Tickets Sold:</span> {data.tickets}</p>
                <p> <span style={{color: "#7dd3fc"}}>Revenue:</span> ₹{data.revenue}</p>
              </div>
            ))}
          </div>

          <div className="booking-table">
            <table>
              <thead>
                <tr>
                  <th>Artist</th>
                  <th>User</th>
                  <th>Type</th>
                  <th>Qty</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((b, index) => (
                  <tr key={index}>
                    <td>{b.artist}</td>
                    <td>{b.bookedBy}</td>
                    <td>{b.ticketType}</td>
                    <td>{b.quantity}</td>
                    <td>₹{b.totalPrice}</td>
                    <td>{new Date(b.date).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingReports;
