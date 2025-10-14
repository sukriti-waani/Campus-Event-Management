const Event = require("../models/Event");
const User = require("../models/User"); // Assuming you need this for registration logic

// @desc    Get all events (public, sorted by date)
// @route   GET /api/events
// @access  Public
exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find({})
      .populate("organizer", "username email") // Populate organizer info
      .sort({ date: 1 }); // Sort by date ascending
    res.status(200).json(events);
  } catch (error) {
    console.error("Error in getAllEvents:", error);
    next(error); // Pass error to Express error handling middleware
  }
};

// @desc    Get upcoming events only
// @route   GET /api/events/upcoming
// @access  Public
exports.getUpcomingEvents = async (req, res, next) => {
  console.log("Executing getUpcomingEvents controller function!");
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingEvents = await Event.find({ date: { $gte: today } })
      .populate("organizer", "username email")
      .sort({ date: 1 });

    console.log("Fetched upcoming events:", upcomingEvents.length);
    res.status(200).json(upcomingEvents);
  } catch (error) {
    console.error("Error inside getUpcomingEvents controller:", error);
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
      .populate("attendees", "username email");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error("Error in getEventById:", error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Event not found" });
    }
    next(error);
  }
};

// @desc    Get events created by the logged-in organizer, categorized
// @route   GET /api/events/organizer/my-events
// @access  Private (Organizer only)
exports.getOrganizerEvents = async (req, res, next) => {
  try {
    const organizerId = req.user.id;
    const events = await Event.find({ organizer: organizerId }).sort({
      date: 1,
    });

    const now = new Date();
    const pastEvents = events.filter((event) => new Date(event.date) < now);
    const upcomingEvents = events.filter(
      (event) => new Date(event.date) >= now
    );

    res.json({ past: pastEvents, upcoming: upcomingEvents });
  } catch (err) {
    console.error("Error in getOrganizerEvents:", err.message);
    next(err);
  }
};

// @desc    Create a new event
// @route   POST /api/events
// @access  Private (Organizer only)
exports.createEvent = async (req, res, next) => {
  const { title, description, date, time, location, category, image } =
    req.body;

  if (!title || !date || !location || !description) {
    return res.status(400).json({
      message:
        "Please fill all required fields: title, date, location, description",
    });
  }

  try {
    const newEvent = new Event({
      title,
      description,
      date,
      time,
      location,
      category,
      image,
      organizer: req.user.id,
    });

    const event = await newEvent.save();
    res.status(201).json(event);
  } catch (err) {
    console.error("Error in createEvent:", err.message);
    next(err);
  }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private (Organizer only, own events)
exports.updateEvent = async (req, res, next) => {
  const { title, description, date, time, location, category, image } =
    req.body;

  try {
    let event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: "Event not found" });

    if (event.organizer.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorized" });

    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.time = time || event.time;
    event.location = location || event.location;
    event.category = category || event.category;
    event.image = image || event.image;

    await event.save();
    res.json(event);
  } catch (err) {
    console.error("Error in updateEvent:", err.message);
    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Event not found" });
    next(err);
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private (Organizer only, own events)
exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: "Event not found" });

    if (event.organizer.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorized" });

    await Event.deleteOne({ _id: req.params.id });
    res.json({ msg: "Event removed" });
  } catch (err) {
    console.error("Error in deleteEvent:", err.message);
    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Event not found" });
    next(err);
  }
};

// @desc    Register a student for an event
// @route   POST /api/events/:id/register
// @access  Private (Student only)
exports.registerForEvent = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const studentId = req.user.id;

    const event = await Event.findById(eventId);
    const user = await User.findById(studentId);

    if (!event) return res.status(404).json({ message: "Event not found" });
    if (!user) return res.status(404).json({ message: "Student not found" });

    if (event.attendees.includes(studentId)) {
      return res
        .status(400)
        .json({ message: "Already registered for this event" });
    }

    event.attendees.push(studentId);
    await event.save();

    if (!user.registeredEvents.includes(eventId)) {
      user.registeredEvents.push(eventId);
      await user.save();
    }

    res.json({ message: "Successfully registered for the event" });
  } catch (err) {
    console.error("Error in registerForEvent:", err.message);
    if (err.kind === "ObjectId")
      return res.status(404).json({ message: "Event or User not found" });
    next(err);
  }
};

// @desc    Unregister a student from an event
// @route   POST /api/events/:id/unregister
// @access  Private (Student only)
exports.unregisterFromEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    const user = await User.findById(req.user.id);

    if (!event) return res.status(404).json({ message: "Event not found" });
    if (!user) return res.status(404).json({ message: "User not found" });

    event.attendees = event.attendees.filter(
      (attendeeId) => attendeeId.toString() !== user._id.toString()
    );
    await event.save();

    user.registeredEvents = user.registeredEvents.filter(
      (eventId) => eventId.toString() !== event._id.toString()
    );
    await user.save();

    res.status(200).json({ message: "Successfully unregistered from event" });
  } catch (error) {
    console.error("Error in unregisterFromEvent:", error.message);
    if (error.kind === "ObjectId")
      return res.status(404).json({ message: "Event or User not found" });
    next(error);
  }
};
