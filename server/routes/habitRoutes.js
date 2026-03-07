const express = require("express");
const router = express.Router();

const Habit = require("../models/Habit");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");


// CREATE HABIT
router.post("/", authMiddleware, async (req, res) => {
  try {

    const { title } = req.body;

    const habit = new Habit({
      title,
      user: req.user
    });

    await habit.save();

    res.status(201).json(habit);

  } catch (error) {
    res.status(500).json({ message: "Error creating habit" });
  }
});


// GET HABITS
router.get("/", authMiddleware, async (req, res) => {
  try {

    const habits = await Habit.find({ user: req.user });

    res.json(habits);

  } catch (error) {
    res.status(500).json({ message: "Error fetching habits" });
  }
});


// COMPLETE HABIT
router.put("/:id/complete", authMiddleware, async (req, res) => {
  try {

    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const today = new Date();

    if (habit.lastCompleted) {

      const diff =
        (today - habit.lastCompleted) / (1000 * 60 * 60 * 24);

      if (diff < 2) {
        habit.streak += 1;
      } else {
        habit.streak = 1;
      }

    } else {
      habit.streak = 1;
    }

    habit.lastCompleted = today;

    await habit.save();

    const user = await User.findById(req.user);

    user.totalXP += habit.xp;

    user.level = Math.floor(user.totalXP / 100) + 1;

    await user.save();

    res.json({
      message: "Habit completed",
      streak: habit.streak,
      totalXP: user.totalXP,
      level: user.level
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error completing habit" });
  }
});
router.delete("/:id", authMiddleware, async (req, res) => {

  try {

    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    if (habit.user.toString() !== req.user) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Habit.findByIdAndDelete(req.params.id);

    res.json({ message: "Habit deleted" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting habit" });
  }

});

module.exports = router;