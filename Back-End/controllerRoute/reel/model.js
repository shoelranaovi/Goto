const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ReelSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    trim: true,
    maxlength: 1000,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [CommentSchema],
  views: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add a virtual to get likes count
ReelSchema.virtual("likesCount").get(function () {
  return this.likes.length;
});

// Add a virtual to get comments count
ReelSchema.virtual("commentsCount").get(function () {
  return this.comments.length;
});

// Set virtuals to true in toJSON
ReelSchema.set("toJSON", { virtuals: true });
ReelSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Reel", ReelSchema);
