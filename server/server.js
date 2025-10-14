// Load environment variables at the very top
require("dotenv").config();

// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

// Import routes and middleware
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const errorHandler = require("./middleware/errorHandler");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static files from 'uploads' directory

// Connect to MongoDB
mongoose
  .connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/events", eventRoutes); // Event routes

// Centralized error handler
app.use(errorHandler);

// Basic test route
app.get("/", (req, res) => {
  res.send("Campus Event Management Backend is running!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
