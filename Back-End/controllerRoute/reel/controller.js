const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Reel = require("../models/Reel");
const User = require("../models/User");

// @route   POST api/reels
// @desc    Create a new reel
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const { videoUrl, caption } = req.body;

    if (!videoUrl) {
      return res.status(400).json({ msg: "Video URL is required" });
    }

    const newReel = new Reel({
      user: req.user.id,
      videoUrl,
      caption,
    });

    const reel = await newReel.save();

    // Populate user data
    await reel.populate("user", "username profileImage");

    res.json(reel);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/reels
// @desc    Get all reels
// @access  Public
router.get("/", async (req, res) => {
  try {
    // Get reels, newest first
    const reels = await Reel.find()
      .sort({ createdAt: -1 })
      .populate("user", "username profileImage")
      .populate("comments.user", "username profileImage");

    res.json(reels);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/reels/:id
// @desc    Get reel by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id)
      .populate("user", "username profileImage")
      .populate("comments.user", "username profileImage");

    if (!reel) {
      return res.status(404).json({ msg: "Reel not found" });
    }

    // Increment view count
    reel.views += 1;
    await reel.save();

    res.json(reel);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Reel not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/reels/:id
// @desc    Delete a reel
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id);

    if (!reel) {
      return res.status(404).json({ msg: "Reel not found" });
    }

    // Check user owns the reel
    if (reel.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await reel.remove();

    res.json({ msg: "Reel removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Reel not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   POST api/reels/:id/like
// @desc    Like or unlike a reel
// @access  Private
router.post("/:id/like", auth, async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id);

    if (!reel) {
      return res.status(404).json({ msg: "Reel not found" });
    }

    // Check if the reel has already been liked by this user
    const isLiked = reel.likes.some((like) => like.toString() === req.user.id);

    if (isLiked) {
      // Remove like
      reel.likes = reel.likes.filter((like) => like.toString() !== req.user.id);
    } else {
      // Add like
      reel.likes.unshift(req.user.id);
    }

    await reel.save();

    res.json({
      isLiked: !isLiked,
      likesCount: reel.likes.length,
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Reel not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   POST api/reels/:id/comment
// @desc    Comment on a reel
// @access  Private
router.post("/:id/comment", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const reel = await Reel.findById(req.params.id);

    if (!reel) {
      return res.status(404).json({ msg: "Reel not found" });
    }

    const newComment = {
      text: req.body.text,
      user: req.user.id,
    };

    reel.comments.unshift(newComment);

    await reel.save();

    // Populate the user for the new comment
    const comment = reel.comments[0].toObject();
    comment.user = {
      _id: user._id,
      username: user.username,
      profileImage: user.profileImage,
    };

    res.json({ comment });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Reel not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/reels/:id/comment/:comment_id
// @desc    Delete comment on a reel
// @access  Private
router.delete("/:id/comment/:comment_id", auth, async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id);

    if (!reel) {
      return res.status(404).json({ msg: "Reel not found" });
    }

    // Pull out comment
    const comment = reel.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    // Check user is comment owner
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Get remove index
    const removeIndex = reel.comments
      .map((comment) => comment.id)
      .indexOf(req.params.comment_id);

    reel.comments.splice(removeIndex, 1);

    await reel.save();

    res.json(reel.comments);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Comment or reel not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   GET api/reels/user/:user_id
// @desc    const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const Reel = require("../models/Reel");
const User = require("../models/User");

// @route   POST api/reels
// @desc    Create a new reel
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const { videoUrl, caption } = req.body;

    if (!videoUrl) {
      return res.status(400).json({ msg: "Video URL is required" });
    }

    const newReel = new Reel({
      user: req.user.id,
      videoUrl,
      caption,
    });

    const reel = await newReel.save();

    // Populate user data
    await reel.populate("user", "username profileImage");

    res.json(reel);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/reels
// @desc    Get all reels
// @access  Public
router.get("/", async (req, res) => {
  try {
    // Get reels, newest first
    const reels = await Reel.find()
      .sort({ createdAt: -1 })
      .populate("user", "username profileImage")
      .populate("comments.user", "username profileImage");

    res.json(reels);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/reels/:id
// @desc    Get reel by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id)
      .populate("user", "username profileImage")
      .populate("comments.user", "username profileImage");

    if (!reel) {
      return res.status(404).json({ msg: "Reel not found" });
    }

    // Increment view count
    reel.views += 1;
    await reel.save();

    res.json(reel);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Reel not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/reels/:id
// @desc    Delete a reel
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id);

    if (!reel) {
      return res.status(404).json({ msg: "Reel not found" });
    }

    // Check user owns the reel
    if (reel.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await reel.remove();

    res.json({ msg: "Reel removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Reel not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   POST api/reels/:id/like
// @desc    Like or unlike a reel
// @access  Private
router.post("/:id/like", auth, async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id);

    if (!reel) {
      return res.status(404).json({ msg: "Reel not found" });
    }

    // Check if the reel has already been liked by this user
    const isLiked = reel.likes.some((like) => like.toString() === req.user.id);

    if (isLiked) {
      // Remove like
      reel.likes = reel.likes.filter((like) => like.toString() !== req.user.id);
    } else {
      // Add like
      reel.likes.unshift(req.user.id);
    }

    await reel.save();

    res.json({
      isLiked: !isLiked,
      likesCount: reel.likes.length,
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Reel not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   POST api/reels/:id/comment
// @desc    Comment on a reel
// @access  Private
router.post("/:id/comment", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const reel = await Reel.findById(req.params.id);

    if (!reel) {
      return res.status(404).json({ msg: "Reel not found" });
    }

    const newComment = {
      text: req.body.text,
      user: req.user.id,
    };

    reel.comments.unshift(newComment);

    await reel.save();

    // Populate the user for the new comment
    const comment = reel.comments[0].toObject();
    comment.user = {
      _id: user._id,
      username: user.username,
      profileImage: user.profileImage,
    };

    res.json({ comment });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Reel not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/reels/:id/comment/:comment_id
// @desc    Delete comment on a reel
// @access  Private
router.delete("/:id/comment/:comment_id", auth, async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id);

    if (!reel) {
      return res.status(404).json({ msg: "Reel not found" });
    }

    // Pull out comment
    const comment = reel.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    // Check user is comment owner
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Get remove index
    const removeIndex = reel.comments
      .map((comment) => comment.id)
      .indexOf(req.params.comment_id);

    reel.comments.splice(removeIndex, 1);

    await reel.save();

    res.json(reel.comments);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Comment or reel not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   GET api/reels/user/:user_id
// @desc    Get all reels by user ID
// @access  Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const reels = await Reel.find({ user: req.params.user_id })
      .sort({ createdAt: -1 })
      .populate("user", "username profileImage")
      .populate("comments.user", "username profileImage");

    if (!reels.length) {
      return res.status(404).json({ msg: "No reels found for this user" });
    }

    res.json(reels);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
// @access  Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const reels = await Reel.find({ user: req.params.user_id })
      .sort({ createdAt: -1 })
      .populate("user", "username profileImage")
      .populate("comments.user", "username profileImage");

    if (!reels.length) {
      return res.status(404).json({ msg: "No reels found for this user" });
    }

    res.json(reels);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
