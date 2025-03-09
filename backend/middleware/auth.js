// In middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Import the User model
require("dotenv").config();


async function authenticateToken(req, res, next) {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract token
    if (!token) {
      return res.status(401).json({ message: "Access denied. Invalid token format." });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verified.userId); // Fetch full user object

    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    req.user = { _id: user._id.toString() };
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(400).json({ message: "Invalid token" });
  }
}

module.exports = authenticateToken;
