const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body; 

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const role = email === "admin@gmail.com" ? "admin" : "user";

    
    const newUser = await User.create({ name, email, password: hashed, role });

    const token = jwt.sign({ email, role }, JWT_SECRET, { expiresIn: "7d" });


    res.json({ token, name: newUser.name, email, role });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Signup failed" });
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ email, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, email, name: user.name, role: user.role });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});


router.put("/users/:email", async (req, res) => {
  const { name } = req.body; 

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      { name },
      { new: true }
    );

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ name: user.name, email: user.email, role: user.role });
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ error: "Failed to update user" });
  }
});


router.get("/users/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error("Get user error:", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});


module.exports = router;
