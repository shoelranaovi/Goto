const fs = require("fs");
const multer = require("multer");
const path = require("path");

function fileUpload(req, res, next) {
  const up_folder = path.join(__dirname, "../../assets/userFiles");

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (!fs.existsSync(up_folder)) {
        fs.mkdirSync(up_folder, { recursive: true });
      }
      cb(null, up_folder);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
  });

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 50 * 1024 * 1024, // 50 MB max file size
    },
    fileFilter: (req, file, cb) => {
      // Accept only images and videos
      if (
        file.mimetype.startsWith("image/") ||
        file.mimetype.startsWith("video/")
      ) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    },
  });

  // Middleware to handle multiple file uploads
  upload.array("Images", 10)(req, res, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error uploading files",
        error: err.message,
      });
    }

    // if (!req.files || req.files.length === 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "No files were uploaded",
    //   });
    // }

    // Process uploaded files
    const fileData = req.files.map((file) => {
      const fileUrl = `${req.protocol}://${req.get("host")}/assets/userFiles/${
        file.filename
      }`;
      return {
        originalName: file.originalname,
        fileName: file.filename,
        fileUrl: fileUrl,
        fileType: file.mimetype.split("/")[0], // e.g., "image" or "video"
      };
    });

    // Attach files data to the request object for further processing
    req.filesData = fileData;

    next();
  });
}

module.exports = fileUpload;
