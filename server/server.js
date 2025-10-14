require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes"); // Make sure this path is correct!

const app = express();

// --------------------
// Connect to MongoDB
// --------------------
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.error("MongoDB connection error:", err)); // Added specific error message

// --------------------
// Middleware
// --------------------
app.use(cors());
app.use(express.json()); // Body parser

// --------------------
// API Routes
// --------------------
console.log("App: Registering auth routes at /api/auth");
app.use("/api/auth", authRoutes);

console.log("App: Registering event routes at /api/events");
app.use("/api/events", eventRoutes); // This is where /api/events/upcoming should be caught

// --------------------
// Serve frontend (static files)
// --------------------
console.log(
  "App: Serving static files from",
  path.join(__dirname, "../frontend/dist")
);
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Catch-all route to serve index.html for SPA routing
// This should ONLY be hit if no other routes (including API routes) match.
console.log("App: Registering catch-all route for SPA");
app.get("*", (req, res) => {
  console.warn(
    `App: Catch-all route hit for: ${req.method} ${req.originalUrl}`
  );
  res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
});

// --------------------
// Start Server
// --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
