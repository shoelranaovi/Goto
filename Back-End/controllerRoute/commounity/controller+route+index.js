// controllers/communityController.js
const Community = require("../models/Community");
const Post = require("../models/Post");
const User = require("../models/User");
const mongoose = require("mongoose");

// Get community by ID
exports.getCommunity = async (req, res) => {
  try {
    const community = await Community.findById(req.params.communityId);

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    // Get post count
    const postsCount = await Post.countDocuments({ community: community._id });

    // Get member count
    const membersCount = await User.countDocuments({
      communities: { $in: [community._id] },
    });

    const communityData = {
      _id: community._id,
      name: community.name,
      description: community.description,
      profileImage: community.profileImage,
      coverImage: community.coverImage,
      rules: community.rules,
      createdAt: community.createdAt,
      updatedAt: community.updatedAt,
      members: membersCount,
      postsCount: postsCount,
    };

    res.status(200).json(communityData);
  } catch (error) {
    console.error("Error fetching community:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Check user membership in community
exports.checkMembership = async (req, res) => {
  try {
    // Assuming req.user comes from auth middleware
    const userId = req.user.id;
    const communityId = req.params.communityId;

    const user = await User.findById(userId);
    const isMember = user.communities.includes(communityId);

    res.status(200).json({ isMember });
  } catch (error) {
    console.error("Error checking membership:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Join or leave community
exports.toggleMembership = async (req, res) => {
  try {
    const userId = req.user.id;
    const communityId = req.params.communityId;

    const user = await User.findById(userId);
    const communityIndex = user.communities.indexOf(communityId);

    if (communityIndex === -1) {
      // Join community
      user.communities.push(communityId);
      await user.save();
      res.status(200).json({ message: "Joined community successfully" });
    } else {
      // Leave community
      user.communities.splice(communityIndex, 1);
      await user.save();
      res.status(200).json({ message: "Left community successfully" });
    }
  } catch (error) {
    console.error("Error updating membership:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get community posts
exports.getCommunityPosts = async (req, res) => {
  try {
    const communityId = req.params.communityId;
    const userId = req.user.id;

    const posts = await Post.find({ community: communityId })
      .sort({ createdAt: -1 })
      .populate("author", "name profileImage")
      .lean();

    // Add isLiked field to each post
    const postsWithLikeInfo = await Promise.all(
      posts.map(async (post) => {
        const isLiked = post.likes.includes(userId);
        return {
          ...post,
          isLiked,
          likes: post.likes.length,
        };
      })
    );

    res.status(200).json(postsWithLikeInfo);
  } catch (error) {
    console.error("Error fetching community posts:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create post in community
exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const communityId = req.params.communityId;
    const userId = req.user.id;

    // Check if user is a member of the community
    const user = await User.findById(userId);
    if (!user.communities.includes(communityId)) {
      return res.status(403).json({ message: "You must be a member to post" });
    }

    const newPost = new Post({
      content,
      author: userId,
      community: communityId,
      image: req.body.image || null,
    });

    await newPost.save();

    // Populate author info before returning
    const populatedPost = await Post.findById(newPost._id)
      .populate("author", "name profileImage")
      .lean();

    // Add isLiked (will be false for new post) and likes count
    populatedPost.isLiked = false;
    populatedPost.likes = 0;

    res.status(201).json(populatedPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Like or unlike a post
exports.toggleLikePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const likeIndex = post.likes.indexOf(userId);
    if (likeIndex === -1) {
      // Add like
      post.likes.push(userId);
    } else {
      // Remove like
      post.likes.splice(likeIndex, 1);
    }

    await post.save();
    res.status(200).json({
      likes: post.likes.length,
      isLiked: likeIndex === -1,
    });
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// routes/communityRoutes.js
const express = require("express");
const router = express.Router();
const communityController = require("../controllers/communityController");
const auth = require("../middleware/auth");

// Get community by id
router.get("/communities/:communityId", communityController.getCommunity);

// Check user membership in community
router.get(
  "/communities/:communityId/membership",
  auth,
  communityController.checkMembership
);

// Join community
router.post(
  "/communities/:communityId/members",
  auth,
  communityController.toggleMembership
);

// Leave community
router.delete(
  "/communities/:communityId/members",
  auth,
  communityController.toggleMembership
);

// Get community posts
router.get(
  "/communities/:communityId/posts",
  auth,
  communityController.getCommunityPosts
);

// Create post in community
router.post(
  "/communities/:communityId/posts",
  auth,
  communityController.createPost
);

// Like or unlike post
router.post("/posts/:postId/like", auth, communityController.toggleLikePost);

module.exports = router;
