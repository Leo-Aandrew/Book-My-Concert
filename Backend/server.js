const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const concertRoutes = require("./routes/concertRoutes");
const bookingRoutes = require("./routes/Bookings.js");
const auth = require("./routes/Auth.js");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


app.use("/concerts", concertRoutes);
app.use("/bookings", bookingRoutes);
app.use("/api/auth", auth);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
