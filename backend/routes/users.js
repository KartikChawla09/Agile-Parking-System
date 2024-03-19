const express = require("express");
const router = express.Router(); // Note the parentheses to call the function
const User = require("../models/User");

// New User Register

router.post("/register", async (req, res) => {
  console.log("hello");
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/login", async (req, res) => {
  console.log("hello2");

  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Check if password matches
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }
    // Authentication successful
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
