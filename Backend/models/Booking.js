// models/Booking.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  concertId: String, // store concert._id from frontend
  artist: String,
  venue: String,
  location: String,
  ticketType: String,
  quantity: Number,
  totalPrice: Number,
  bookedBy: String,
  paymentMethod: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
