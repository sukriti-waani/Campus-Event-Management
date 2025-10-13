// routes/eventRoutes.js
const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const { protect, authorize } = require("../middleware/authMiddleware");
const asyncHandler = require("express-async-handler");
// const upload = require('../utils/upload'); // If you implement file uploads later

// @desc    Get all events
// @route   GET /api/events
// @access  Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const events = await Event.find({}).populate("organizer", "username email"); // Populate organizer info
    res.json(events);
  })
);

// @desc    Get single event by ID
// @route   GET /api/events/:id
// @access  Public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id).populate(
      "organizer",
      "username email"
    );

    if (event) {
      res.json(event);
    } else {
      res.status(404);
      throw new Error("Event not found");
    }
  })
);

// @desc    Create an event
// @route   POST /api/events
// @access  Private/Organizer
router.post(
  "/",
  protect,
  authorize("organizer"), // Only organizers can create events
  // upload.single('image'), // If you implement image upload
  asyncHandler(async (req, res) => {
    const { title, description, date, location, image } = req.body; // 'image' would come from upload middleware or a URL

    if (!title || !description || !date || !location) {
      res.status(400);
      throw new Error("Please enter all required fields");
    }

    const event = new Event({
      title,
      description,
      date,
      location,
      organizer: req.user._id, // Organizer is the logged-in user
      image, // If image path is sent in body or from upload middleware
    });

    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  })
);

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Organizer
router.put(
  "/:id",
  protect,
  authorize("organizer"),
  asyncHandler(async (req, res) => {
    const { title, description, date, location, image } = req.body;

    const event = await Event.findById(req.params.id);

    if (event) {
      // Ensure the logged-in organizer is the owner of the event
      if (event.organizer.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error("Not authorized to update this event");
      }

      event.title = title || event.title;
      event.description = description || event.description;
      event.date = date || event.date;
      event.location = location || event.location;
      event.image = image || event.image; // Update image if provided

      const updatedEvent = await event.save();
      res.json(updatedEvent);
    } else {
      res.status(404);
      throw new Error("Event not found");
    }
  })
);

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Organizer
router.delete(
  "/:id",
  protect,
  authorize("organizer"),
  asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);

    if (event) {
      // Ensure the logged-in organizer is the owner of the event
      if (event.organizer.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error("Not authorized to delete this event");
      }

      await event.deleteOne(); // Use deleteOne() or remove()
      res.json({ message: "Event removed" });
    } else {
      res.status(404);
      throw new Error("Event not found");
    }
  })
);

module.exports = router;
