// routes/themeRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { protect } = require("../middleware/auth");

// @route   GET /api/themes/preference
// @desc    Get user's theme preference
// @access  Private
router.get("/preference", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "themePreference customTheme"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      themePreference: user.themePreference,
      customTheme: user.customTheme,
    });
  } catch (error) {
    console.error("Get theme preference error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT /api/themes/preference
// @desc    Update user's theme preference
// @access  Private
router.put("/preference", protect, async (req, res) => {
  try {
    const { themePreference } = req.body;

    // Validate theme preference
    if (!["light", "dark", "system"].includes(themePreference)) {
      return res.status(400).json({ message: "Invalid theme preference" });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.themePreference = themePreference;
    await user.save();

    res.json({ themePreference: user.themePreference });
  } catch (error) {
    console.error("Update theme preference error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT /api/themes/custom
// @desc    Update user's custom theme
// @access  Private
router.put("/custom", protect, async (req, res) => {
  try {
    const { customTheme } = req.body;

    // Basic validation of custom theme
    if (!customTheme || typeof customTheme !== "object") {
      return res.status(400).json({ message: "Invalid custom theme data" });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update custom theme
    user.customTheme = {
      ...user.customTheme, // Keep existing settings
      ...customTheme, // Update with new settings
    };

    await user.save();

    res.json({ customTheme: user.customTheme });
  } catch (error) {
    console.error("Update custom theme error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/themes/defaults
// @desc    Get system default themes
// @access  Public
router.get("/defaults", (req, res) => {
  // These would typically come from a database or config
  const defaultThemes = {
    light: {
      primary: "#4F46E5", // indigo-600
      secondary: "#059669", // emerald-600
      background: "#FFFFFF", // white
      text: "#1F2937", // gray-800
      // Add more properties as needed
    },
    dark: {
      primary: "#818CF8", // indigo-400
      secondary: "#34D399", // emerald-400
      background: "#1F2937", // gray-800
      text: "#F9FAFB", // gray-50
      // Add more properties as needed
    },
  };

  res.json(defaultThemes);
});

module.exports = router;
