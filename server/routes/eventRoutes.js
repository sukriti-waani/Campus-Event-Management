const express = require("express");
const router = express.Router();
const Event = require("../models/Event"); // Adjust path as needed
const { authenticateToken, authorizeRole } = require("../middleware/auth"); // Adjust path as needed
const mongoose = require("mongoose");
const eventController = require("../controllers/eventController");

// @route   GET /api/events
// @desc    Get all events (publicly accessible)
// @access  Public
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate("organizer", "username"); // Populate organizer's username
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET /api/organizer/events
// @desc    Get events created by the logged-in organizer, categorized
// @access  Private (Organizer only)
router.get(
  "/organizer/events",
  authenticateToken,
  authorizeRole("organizer"),
  async (req, res) => {
    try {
      const organizerId = req.user.id;
      const events = await Event.find({ organizer: organizerId }).sort({
        date: 1,
      }); // Sort by date

      const now = new Date();
      const pastEvents = events.filter((event) => event.date < now);
      const upcomingEvents = events.filter((event) => event.date >= now);
      // For 'current' events, you might need a more complex logic, e.g., if event has a start and end time.
      // For simplicity, I'm classifying based on current date relative to event date.
      // If an event is 'today', it would fall under upcoming until it's passed.

      res.json({
        past: pastEvents,
        upcoming: upcomingEvents,
        // You can add a 'current' category if you define a more precise window for it
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   POST /api/events
// @desc    Create a new event
// @access  Private (Organizer only)
router.post(
  "/",
  authenticateToken,
  authorizeRole("organizer"),
  async (req, res) => {
    const { title, description, date, location } = req.body;

    try {
      const newEvent = new Event({
        title,
        description,
        date,
        location,
        organizer: req.user.id, // Assign the logged-in organizer as the event creator
      });

      const event = await newEvent.save();
      res.status(201).json(event);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT /api/events/:id
// @desc    Update an event
// @access  Private (Organizer only, and only for their own events)
router.put(
  "/:id",
  authenticateToken,
  authorizeRole("organizer"),
  async (req, res) => {
    const { title, description, date, location } = req.body;

    try {
      let event = await Event.findById(req.params.id);

      if (!event) {
        return res.status(404).json({ msg: "Event not found" });
      }

      // Ensure organizer can only update their own events
      if (event.organizer.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ msg: "Not authorized to update this event" });
      }

      event.title = title || event.title;
      event.description = description || event.description;
      event.date = date || event.date;
      event.location = location || event.location;

      await event.save();
      res.json(event);
    } catch (err) {
      console.error(err.message);
      // Check for invalid ObjectId format
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Event not found" });
      }
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE /api/events/:id
// @desc    Delete an event
// @access  Private (Organizer only, and only for their own events)
router.delete(
  "/:id",
  authenticateToken,
  authorizeRole("organizer"),
  async (req, res) => {
    try {
      let event = await Event.findById(req.params.id);

      if (!event) {
        return res.status(404).json({ msg: "Event not found" });
      }

      // Ensure organizer can only delete their own events
      if (event.organizer.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ msg: "Not authorized to delete this event" });
      }

      await Event.deleteOne({ _id: req.params.id }); // Use deleteOne with query
      res.json({ msg: "Event removed" });
    } catch (err) {
      console.error(err.message);
      // Check for invalid ObjectId format
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Event not found" });
      }
      res.status(500).send("Server Error");
    }
  }
);

// @route   POST /api/events/:id/register
// @desc    Register a student for an event
// @access  Private (Student only)
router.post(
  "/:id/register",
  authenticateToken,
  authorizeRole("student"),
  async (req, res) => {
    try {
      const eventId = req.params.id;
      const studentId = req.user.id;

      const event = await Event.findById(eventId);

      if (!event) {
        return res.status(404).json({ msg: "Event not found" });
      }

      // Check if student is already registered
      if (event.attendees.includes(studentId)) {
        return res
          .status(400)
          .json({ msg: "Already registered for this event" });
      }

      event.attendees.push(studentId);
      await event.save();
      res.json({ msg: "Successfully registered for the event" });
    } catch (err) {
      console.error(err.message);
      // Check for invalid ObjectId format
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Event not found" });
      }
      res.status(500).send("Server Error");
    }
  }
);

router.get("/upcoming", eventController.getUpcomingEvents); // <--- THIS IS WHAT YOU NEED
// And/or:
router.get("/", eventController.getAllEvents);

module.exports = router;
