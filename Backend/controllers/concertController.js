const Concert = require("../models/Concert");

exports.getConcerts = async (req, res) => {
  try {
    const concerts = await Concert.find();
    res.status(200).json(concerts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch concerts", details: err });
  }
};

exports.createConcert = async (req, res) => {
  try {
    const concertData = req.body;

    if (req.file) {
      concertData.image = `/uploads/${req.file.filename}`;
    }

    const concert = new Concert(concertData);
    await concert.save();
    res.status(201).json(concert);
  } catch (err) {
    res.status(500).json({ error: "Failed to create concert", details: err });
  }
};

exports.updateConcert = async (req, res) => {
  try {
    const concertData = req.body;

    if (req.file) {
      concertData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await Concert.findByIdAndUpdate(
      req.params.id,
      concertData,
      {
        new: true,
      }
    );

    if (!updated) return res.status(404).json({ error: "Concert not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update concert", details: err });
  }
};

exports.deleteConcert = async (req, res) => {
  try {
    const deleted = await Concert.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Concert not found" });
    res.status(200).json({ message: "Concert deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete concert", details: err });
  }
};

exports.getSingleConcert = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (!concert) return res.status(404).json({ error: "Not found" });
    res.json(concert);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateTickets = async (req, res) => {
  try {
    const updatedConcert = await Concert.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedConcert) {
      return res.status(404).json({ error: "Concert not found" });
    }

    res.json(updatedConcert);
  } catch (err) {
    res.status(500).json({ error: "Update failed", details: err.message });
  }
};
