const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    // Added role field
    type: String,
    enum: ["student", "organizer"], // Enforce specific roles
    default: "student", // Default role for new users
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
