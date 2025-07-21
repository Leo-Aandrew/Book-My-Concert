
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getConcerts,
  createConcert,
  updateConcert,
  deleteConcert,
  getSingleConcert,
  updateTickets
} = require("../controllers/concertController");

// 🔧 Setup Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

// 🔄 Use upload.single() for POST route
router.post("/", upload.single("image"), createConcert);


// Other routes
router.get("/", getConcerts);
router.put("/:id", upload.single("image"), updateConcert);
router.delete("/:id", deleteConcert);
router.get("/:id", getSingleConcert);
router.patch("/:id", updateTickets);

module.exports = router;
