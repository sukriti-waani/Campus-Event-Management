const Event = require("../models/Event");
const User = require("../models/User");

// @desc    Get all events
// @route   GET /api/events
// @access  Public
exports.getEvents = async (req, res, next) => {
  try {
    const events = await Event.find({}).populate("organizer", "username email");
    res.json(events);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single event by ID
// @route   GET /api/events/:id
// @access  Public
exports.getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("organizer", "username email")
      .populate("registrations", "username email");
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new event
// @route   POST /api/events
// @access  Private (Organizer only)
exports.createEvent = async (req, res, next) => {
  const { title, date, time, venue, description } = req.body;
  const images = req.files
    ? req.files.map((file) => `/uploads/${file.filename}`)
    : [];

  // Basic validation
  if (!title || !date || !time || !venue || !description) {
    return res
      .status(400)
      .json({
        message:
          "Please fill all required fields: title, date, time, venue, description",
      });
  }

  try {
    const event = await Event.create({
      title,
      date,
      time,
      venue,
      description,
      images,
      organizer: req.user.id, // User ID from JWT
    });
    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    next(error);
  }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private (Organizer only, owner of the event)
exports.updateEvent = async (req, res, next) => {
  const { title, date, time, venue, description } = req.body;
  const images = req.files
    ? req.files.map((file) => `/uploads/${file.filename}`)
    : [];

  try {
    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the logged-in user is the organizer of the event
    if (event.organizer.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this event" });
    }

    event.title = title || event.title;
    event.date = date || event.date;
    event.time = time || event.time;
    event.venue = venue || event.venue;
    event.description = description || event.description;
    if (images.length > 0) {
      event.images = images; // Overwrite existing images, or append if desired
    }

    const updatedEvent = await event.save();
    res.json({ message: "Event updated successfully", event: updatedEvent });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private (Organizer only, owner of the event)
exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the logged-in user is the organizer of the event
    if (event.organizer.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this event" });
    }

    await Event.deleteOne({ _id: req.params.id }); // Use deleteOne or findByIdAndDelete
    res.json({ message: "Event removed successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Register a student for an event
// @route   POST /api/events/:id/register
// @access  Private (Student only)
exports.registerForEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    const user = await User.findById(req.user.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is already registered
    if (event.registrations.includes(user._id)) {
      return res
        .status(400)
        .json({ message: "Already registered for this event" });
    }

    // Add user to event registrations
    event.registrations.push(user._id);
    await event.save();

    // Add event to user's registered events
    user.registeredEvents.push(event._id);
    await user.save();

    res
      .status(200)
      .json({
        message: "Successfully registered for event",
        eventTitle: event.title,
      });
  } catch (error) {
    next(error);
  }
};

// @desc    Unregister a student from an event
// @route   POST /api/events/:id/unregister
// @access  Private (Student only)
exports.unregisterFromEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    const user = await User.findById(req.user.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is registered
    if (!event.registrations.includes(user._id)) {
      return res.status(400).json({ message: "Not registered for this event" });
    }

    // Remove user from event registrations
    event.registrations = event.registrations.filter(
      (regId) => regId.toString() !== user._id.toString()
    );
    await event.save();

    // Remove event from user's registered events
    user.registeredEvents = user.registeredEvents.filter(
      (eventId) => eventId.toString() !== event._id.toString()
    );
    await user.save();

    res
      .status(200)
      .json({
        message: "Successfully unregistered from event",
        eventTitle: event.title,
      });
  } catch (error) {
    next(error);
  }
};
