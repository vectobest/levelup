const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  // TOTAL EXPERIENCE POINTS
  totalXP: {
    type: Number,
    default: 0
  },

  // USER LEVEL
  level: {
    type: Number,
    default: 1
  },

  // GLOBAL STREAK (future feature)
  streak: {
    type: Number,
    default: 0
  },

  // AVATAR EVOLUTION STAGE
  avatarStage: {
    type: Number,
    default: 1
  },

  // BADGES / ACHIEVEMENTS
  badges: {
    type: [String],
    default: []
  }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);