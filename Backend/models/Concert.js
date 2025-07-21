const mongoose = require("mongoose");

const concertSchema = new mongoose.Schema({
  artist: String,
  venue: String,
  location: String,
  genre: String,
  date: String,
  time: String,
  ticketPrice: {
    standard: Number,
    vip: Number
  },
  availableTickets: {
    standard: Number,
    vip: Number
  },
  image: String
});

module.exports = mongoose.model("Concert", concertSchema);
