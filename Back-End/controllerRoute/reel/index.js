// In your main server.js file

// Import required modules
const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/reels", require("./routes/api/reels")); // Add the reels route

// Upload route with Cloudinary
const { upload } = require("./config/cloudinary");

// @route   POST api/upload/video
// @desc    Upload a video to Cloudinary
// @access  Private
app.post("/api/upload/video", upload.single("video"), (req, res) => {
  try {
    // Return the Cloudinary URL
    res.json({
      videoUrl: req.file.path,
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error during upload",
      success: false,
    });
  }
});

// Error handler for Multer/Cloudinary
app.use((err, req, res, next) => {
  if (err.name === "MulterError") {
    return res.status(400).json({
      error: `Upload error: ${err.message}`,
      success: false,
    });
  }

  if (err) {
    return res.status(500).json({
      error: `Server error: ${err.message}`,
      success: false,
    });
  }

  next();
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
