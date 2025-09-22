const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    Images: { type: Array },
    content: {
      type: Object,
      required: [true, "Content is required"],
      minlength: [20, "Content must be at least 20 characters long"],
    },
    privacy: {
      type: String,
      enum: ["public", "friends", "only-me"], // Customize this based on your use case
    },
    description: {
      type: String,
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
