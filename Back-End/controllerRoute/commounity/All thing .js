// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/communities", require("./routes/communities"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profileImage: {
      type: String,
    },
    bio: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);

// models/Community.js
const mongoose = require("mongoose");

const CommunitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    moderators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    isPrivate: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Community", CommunitySchema);

// models/JoinRequest.js
const mongoose = require("mongoose");

const JoinRequestSchema = new mongoose.Schema(
  {
    community: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JoinRequest", JoinRequestSchema);

// models/Post.js
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    media: [
      {
        type: String,
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    community: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        content: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);

// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No authentication token, access denied" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by id
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Set user in request
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token, authorization denied" });
  }
};

// routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Setup multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// @route   POST /api/auth/register
// @desc    Register a user
// @access  Public
router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    const { name, email, password, bio } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user
    user = new User({
      name,
      email,
      password,
      bio,
      profileImage: req.file ? `/uploads/${req.file.filename}` : undefined,
    });

    await user.save();

    // Create and send token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        bio: user.bio,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create and send token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        bio: user.bio,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/auth/user
// @desc    Get user data
// @access  Private
router.get("/user", auth, async (req, res) => {
  try {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      profileImage: req.user.profileImage,
      bio: req.user.bio,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

// routes/communities.js
const express = require("express");
const router = express.Router();
const Community = require("../models/Community");
const JoinRequest = require("../models/JoinRequest");
const User = require("../models/User");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Setup multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// Middleware to check if user is admin or moderator
const isAdminOrModerator = async (req, res, next) => {
  try {
    const communityId = req.params.id;
    const community = await Community.findById(communityId);

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    const isAdmin = community.admin.equals(req.user._id);
    const isModerator = community.moderators.some((mod) =>
      mod.equals(req.user._id)
    );

    if (!isAdmin && !isModerator) {
      return res
        .status(403)
        .json({ message: "Access denied. Not an admin or moderator" });
    }

    req.community = community;
    req.isAdmin = isAdmin;
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @route   GET /api/communities
// @desc    Get all communities
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const communities = await Community.find()
      .select("name description coverImage members isPrivate")
      .populate("admin", "name");

    res.json(communities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   POST /api/communities
// @desc    Create a community
// @access  Private
router.post("/", [auth, upload.single("coverImage")], async (req, res) => {
  try {
    const { name, description, isPrivate } = req.body;

    // Create new community
    const community = new Community({
      name,
      description,
      isPrivate: isPrivate === "true",
      admin: req.user._id,
      coverImage: req.file ? `/uploads/${req.file.filename}` : undefined,
      members: [req.user._id], // Add creator as member
    });

    await community.save();

    res.status(201).json(community);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/communities/:id
// @desc    Get community by ID
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const community = await Community.findById(req.params.id)
      .populate("admin", "name")
      .populate("moderators", "name")
      .lean();

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    res.json(community);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT /api/communities/:id
// @desc    Update community
// @access  Private (Admin only)
router.put(
  "/:id",
  [auth, isAdminOrModerator, upload.single("coverImage")],
  async (req, res) => {
    try {
      const { name, description, isPrivate } = req.body;

      // Only admins can update certain fields
      if (
        !req.isAdmin &&
        (name !== req.community.name || isPrivate !== req.community.isPrivate)
      ) {
        return res
          .status(403)
          .json({ message: "Only admins can update name or privacy settings" });
      }

      const updatedFields = {
        name,
        description,
        isPrivate: isPrivate === "true",
      };

      if (req.file) {
        updatedFields.coverImage = `/uploads/${req.file.filename}`;
      }

      const updatedCommunity = await Community.findByIdAndUpdate(
        req.params.id,
        { $set: updatedFields },
        { new: true }
      ).populate("admin", "name");

      res.json(updatedCommunity);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// @route   POST /api/communities/:id/join
// @desc    Join a community or create a join request
// @access  Private
router.post("/:id/join", auth, async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    // Check if user is already a member
    if (community.members.includes(req.user._id)) {
      return res.status(400).json({ message: "Already a member" });
    }

    // If private community, create a join request
    if (community.isPrivate) {
      // Check if request already exists
      const existingRequest = await JoinRequest.findOne({
        community: community._id,
        user: req.user._id,
        status: "pending",
      });

      if (existingRequest) {
        return res
          .status(400)
          .json({ message: "Join request already pending" });
      }

      const joinRequest = new JoinRequest({
        community: community._id,
        user: req.user._id,
      });

      await joinRequest.save();

      return res.status(201).json({ message: "Join request sent" });
    }

    // For public communities, add user directly
    community.members.push(req.user._id);
    await community.save();

    res.status(200).json({ message: "Joined community" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   POST /api/communities/:id/leave
// @desc    Leave a community
// @access  Private
router.post("/:id/leave", auth, async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    // Check if user is a member
    if (!community.members.includes(req.user._id)) {
      return res.status(400).json({ message: "Not a member" });
    }

    // Check if user is the admin
    if (community.admin.equals(req.user._id)) {
      return res.status(400).json({ message: "Admin can't leave community" });
    }

    // Remove user from members
    community.members = community.members.filter(
      (member) => !member.equals(req.user._id)
    );

    // If user is a moderator, remove from moderators as well
    if (community.moderators.includes(req.user._id)) {
      community.moderators = community.moderators.filter(
        (mod) => !mod.equals(req.user._id)
      );
    }

    await community.save();

    res.status(200).json({ message: "Left community" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/communities/:id/members
// @desc    Get community members
// @access  Private
router.get("/:id/members", auth, async (req, res) => {
  try {
    const community = await Community.findById(req.params.id).populate(
      "members",
      "name email profileImage"
    );

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    res.json(community.members);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   POST /api/communities/:id/moderators
// @desc    Add a moderator
// @access  Private (Admin only)
router.post("/:id/moderators", [auth, isAdminOrModerator], async (req, res) => {
  try {
    const { userId } = req.body;

    // Only admin can add moderators
    if (!req.isAdmin) {
      return res
        .status(403)
        .json({ message: "Only admins can add moderators" });
    }

    const community = req.community;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is a member
    if (!community.members.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User must be a member to become moderator" });
    }

    // Check if user is already a moderator
    if (community.moderators.includes(userId)) {
      return res.status(400).json({ message: "User is already a moderator" });
    }

    // Add user to moderators
    community.moderators.push(userId);
    await community.save();

    res.status(200).json({ message: "Moderator added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   DELETE /api/communities/:id/moderators/:userId
// @desc    Remove a moderator
// @access  Private (Admin only)
router.delete(
  "/:id/moderators/:userId",
  [auth, isAdminOrModerator],
  async (req, res) => {
    try {
      // Only admin can remove moderators
      if (!req.isAdmin) {
        return res
          .status(403)
          .json({ message: "Only admins can remove moderators" });
      }

      const community = req.community;

      // Check if user is a moderator
      if (!community.moderators.includes(req.params.userId)) {
        return res.status(400).json({ message: "User is not a moderator" });
      }

      // Remove user from moderators
      community.moderators = community.moderators.filter(
        (mod) => !mod.equals(req.params.userId)
      );
      await community.save();

      res.status(200).json({ message: "Moderator removed" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// @route   DELETE /api/communities/:id/members/:userId
// @desc    Remove a member
// @access  Private (Admin or Moderator)
router.delete(
  "/:id/members/:userId",
  [auth, isAdminOrModerator],
  async (req, res) => {
    try {
      const community = req.community;
      const userId = req.params.userId;

      // Check if user is a member
      if (!community.members.includes(userId)) {
        return res.status(400).json({ message: "User is not a member" });
      }

      // Check if trying to remove admin
      if (community.admin.equals(userId)) {
        return res
          .status(403)
          .json({ message: "Cannot remove community admin" });
      }

      // Only admin can remove moderators
      if (community.moderators.includes(userId) && !req.isAdmin) {
        return res
          .status(403)
          .json({ message: "Only admins can remove moderators" });
      }

      // Remove user from members
      community.members = community.members.filter(
        (member) => !member.equals(userId)
      );

      // If user is a moderator, remove from moderators as well
      if (community.moderators.includes(userId)) {
        community.moderators = community.moderators.filter(
          (mod) => !mod.equals(userId)
        );
      }

      await community.save();

      res.status(200).json({ message: "Member removed" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// @route   GET /api/communities/:id/join-requests
// @desc    Get join requests for a community
// @access  Private (Admin or Moderator)
router.get(
  "/:id/join-requests",
  [auth, isAdminOrModerator],
  async (req, res) => {
    try {
      const joinRequests = await JoinRequest.find({
        community: req.params.id,
        status: "pending",
      }).populate("user", "name email profileImage");

      res.json(joinRequests);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// @route   POST /api/communities/:id/join-requests/:requestId/accept
// @desc    Accept a join request
// @access  Private (Admin or Moderator)
router.post(
  "/:id/join-requests/:requestId/accept",
  [auth, isAdminOrModerator],
  async (req, res) => {
    try {
      const joinRequest = await JoinRequest.findById(req.params.requestId);

      if (!joinRequest) {
        return res.status(404).json({ message: "Join request not found" });
      }

      if (joinRequest.status !== "pending") {
        return res
          .status(400)
          .json({ message: "Join request already processed" });
      }

      // Update request status
      joinRequest.status = "accepted";
      await joinRequest.save();

      // Add user to community members
      const community = req.community;
      if (!community.members.includes(joinRequest.user)) {
        community.members.push(joinRequest.user);
        await community.save();
      }

      res.status(200).json({ message: "Join request accepted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// @route   POST /api/communities/:id/join-requests/:requestId/reject
// @desc    Reject a join request
// @access  Private (Admin or Moderator)
router.post(
  "/:id/join-requests/:requestId/reject",
  [auth, isAdminOrModerator],
  async (req, res) => {
    try {
      const joinRequest = await JoinRequest.findById(req.params.requestId);

      if (!joinRequest) {
        return res.status(404).json({ message: "Join request not found" });
      }

      if (joinRequest.status !== "pending") {
        return res
          .status(400)
          .json({ message: "Join request already processed" });
      }

      // Update request status
      joinRequest.status = "rejected";
      await joinRequest.save();

      res.status(200).json({ message: "Join request rejected" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
