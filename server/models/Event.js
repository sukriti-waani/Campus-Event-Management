const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String, // e.g., "10:00 AM"
      required: true,
    },
    venue: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String, // Store image paths
      },
    ],
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    registrations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

// Virtual property to categorize events
eventSchema.virtual("status").get(function () {
  const now = new Date();
  const eventDateTime = new Date(this.date);
  const [hours, minutes] = this.time.split(":").map(Number);
  eventDateTime.setHours(hours, minutes);

  if (now < eventDateTime) {
    return "upcoming";
  } else if (
    now >= eventDateTime &&
    now < new Date(eventDateTime.getTime() + 2 * 60 * 60 * 1000)
  ) {
    // Assuming an event is 'ongoing' for 2 hours
    return "ongoing";
  } else {
    return "completed";
  }
});

// Ensure virtuals are included when converting to JSON
eventSchema.set("toJSON", { virtuals: true });
eventSchema.set("toObject", { virtuals: true });

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
