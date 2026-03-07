const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

// GET USER STATS
router.get("/me", authMiddleware, async (req, res) => {
  try {

    const user = await User.findById(req.user).select("-password");

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
});

module.exports = router;