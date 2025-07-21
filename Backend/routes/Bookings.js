const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Concert = require("../models/Concert");

// POST new booking
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: "Booking failed", details: err });
  }
});

// GET all or filtered bookings
router.get("/", async (req, res) => {
  try {
    const { bookedBy } = req.query;
    const query = bookedBy ? { bookedBy } : {};
    const bookings = await Booking.find(query);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// DELETE a booking
router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});




module.exports = router;
