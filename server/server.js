// server.js
require("dotenv").config(); // ADD THIS LINE AT THE VERY TOP
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors"); // ADD THIS FOR FRONTEND CONNECTION

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cors()); // Enable CORS for all origins, you might want to restrict this in production
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static files from 'uploads' directory

// Connect to MongoDB
mongoose
  .connect(process.env.DB_CONNECTION_STRING, {
    // CORRECTED VARIABLE NAME
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// Centralized error handling middleware
app.use(errorHandler);

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Campus Event Management Backend is running!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
