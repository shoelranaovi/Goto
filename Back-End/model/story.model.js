const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  media: { type: String, required: true }, // Image/Video URL
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, index: { expires: "86400s" } }, // 24 ঘন্টা পরে শো হবে না
});

storySchema.pre("save", function (next) {
  this.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 ঘণ্টা পরে expire
  next();
});

const Story = mongoose.model("Story", storySchema);
module.exports = Story;
