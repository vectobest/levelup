const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  xp: {
    type: Number,
    default: 10
  },

  streak: {
    type: Number,
    default: 0
  },

  lastCompleted: {
    type: Date
  }

}, { timestamps: true });

module.exports = mongoose.model("Habit", habitSchema);