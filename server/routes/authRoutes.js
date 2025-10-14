const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const { authenticateToken, authorizeRole } = require("../middleware/auth"); // Adjust path as needed

// =========================
// Public Routes
// =========================

// @route   GET /api/events
// @desc    Get all events (public, sorted by date)
// @access  Public
router.get("/", eventController.getAllEvents);

// @route   GET /api/events/upcoming
// @desc    Get upcoming events only
// @access  Public
router.get("/upcoming", eventController.getUpcomingEvents);

// @route   GET /api/events/:id
// @desc    Get single event by ID
// @access  Public
router.get("/:id", eventController.getEventById);

// =========================
// Organizer Routes
// =========================

// @route   GET /api/events/organizer/my-events
// @desc    Get events created by the logged-in organizer, categorized
// @access  Private (Organizer only)
router.get(
  "/organizer/my-events", // Changed to be more explicit and avoid conflict with /api/events/:id
  authenticateToken,
  authorizeRole("organizer"),
  eventController.getOrganizerEvents
);

// @route   POST /api/events
// @desc    Create a new event
// @access  Private (Organizer only)
router.post(
  "/",
  authenticateToken,
  authorizeRole("organizer"),
  eventController.createEvent
);

// @route   PUT /api/events/:id
// @desc    Update an event
// @access  Private (Organizer only, own events)
router.put(
  "/:id",
  authenticateToken,
  authorizeRole("organizer"),
  eventController.updateEvent
);

// @route   DELETE /api/events/:id
// @desc    Delete an event
// @access  Private (Organizer only, own events)
router.delete(
  "/:id",
  authenticateToken,
  authorizeRole("organizer"),
  eventController.deleteEvent
);

// =========================
// Student Routes
// =========================

// @route   POST /api/events/:id/register
// @desc    Register a student for an event
// @access  Private (Student only)
router.post(
  "/:id/register",
  authenticateToken,
  authorizeRole("student"),
  eventController.registerForEvent
);

// @route   POST /api/events/:id/unregister
// @desc    Unregister a student from an event
// @access  Private (Student only)
router.post(
  "/:id/unregister",
  authenticateToken,
  authorizeRole("student"),
  eventController.unregisterFromEvent
);

module.exports = router;
