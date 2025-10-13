// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { protect } = require("../middleware/authMiddleware"); // Using protect to get user data for profile

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { username, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      username,
      email,
      password,
      role: role || "student", // Default to 'student' if no role provided
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  })
);

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  })
);

// @desc    Get user profile (protected route)
// @route   GET /api/auth/profile
// @access  Private
router.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = req.user; // req.user is set by the protect middleware

    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        registeredEvents: user.registeredEvents,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// @desc    Register a student for an event
// @route   POST /api/auth/register-event/:id
// @access  Private (Student Only)
router.post(
  "/register-event/:id",
  protect,
  asyncHandler(async (req, res) => {
    const eventId = req.params.id;
    const userId = req.user._id;

    const user = await User.findById(userId);
    const event = await Event.findById(eventId); // Assuming Event model is available

    if (!user || !event) {
      res.status(404);
      throw new Error("User or Event not found");
    }

    // Ensure only students can register for events
    if (user.role !== "student") {
      res.status(403);
      throw new Error("Only students can register for events");
    }

    // Check if already registered
    if (user.registeredEvents.includes(eventId)) {
      res.status(400);
      throw new Error("Already registered for this event");
    }

    user.registeredEvents.push(eventId);
    await user.save();

    // Optional: Add user to event's attendees list
    // event.attendees.push(userId);
    // await event.save();

    res.status(200).json({ message: "Successfully registered for the event!" });
  })
);

module.exports = router;
