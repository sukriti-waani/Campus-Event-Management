const express = require("express");
const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  unregisterFromEvent,
} = require("../controllers/eventController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const { uploadEventImages } = require("../middleware/uploadMiddleware");

const router = express.Router();

// Public routes
router.get("/", getEvents);
router.get("/:id", getEventById);

// Private routes (Student and Organizer)
router.post(
  "/:id/register",
  protect,
  authorizeRoles("student"),
  registerForEvent
);
router.post(
  "/:id/unregister",
  protect,
  authorizeRoles("student"),
  unregisterFromEvent
);

// Organizer-only routes
router.post(
  "/",
  protect,
  authorizeRoles("organizer"),
  uploadEventImages,
  createEvent
);
router.put(
  "/:id",
  protect,
  authorizeRoles("organizer"),
  uploadEventImages,
  updateEvent
);
router.delete("/:id", protect, authorizeRoles("organizer"), deleteEvent);

module.exports = router;
