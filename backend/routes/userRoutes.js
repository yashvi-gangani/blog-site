const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const User = require("../models/User");

router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;