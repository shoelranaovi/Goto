const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "social_app_reels",
    resource_type: "video",
    allowed_formats: ["mp4", "mov", "webm"],
    transformation: [{ width: 720, crop: "scale" }, { quality: "auto" }],
  },
});

// Create multer upload instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only video files
    if (!file.mimetype.startsWith("video/")) {
      return cb(new Error("Only video files are allowed!"), false);
    }
    cb(null, true);
  },
});

module.exports = {
  cloudinary,
  upload,
};
