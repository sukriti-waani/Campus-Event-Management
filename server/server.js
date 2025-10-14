require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");

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
  .catch((err) => console.error(err));

// --------------------
// Middleware
// --------------------
app.use(cors());
app.use(express.json()); // Body parser

// --------------------
// API Routes
// --------------------
// Mount auth routes at /api/auth
app.use("/api/auth", authRoutes);

// Mount event routes at /api/events
app.use("/api/events", eventRoutes);

// --------------------
// Serve frontend (static files)
// --------------------
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Catch-all route to serve index.html for SPA routing
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
});

// --------------------
// Start Server
// --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
