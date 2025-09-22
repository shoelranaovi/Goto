const errorHandler = require("../../middleware/errorhandler");
const User = require("../../model/user.model");
const { deleteFile } = require("../../utils/deleteavatar");
const path = require("path");
const bcrypt = require("bcrypt");
const sharp = require("sharp");
const cloudinary = require("../../confiq/claudinary");
const Story = require("../../model/story.model");

const getinfo = async (req, res, next) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(errorHandler(401, "error occoured"));
  }
};

const updateAvatar = async (req, res) => {
  // Check if a file was uploaded

  if (!req.files) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded. Please select a valid image.",
    });
  }

  try {
    // Get the authenticated user ID (assume it's set via authentication middleware)
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please log in.",
      });
    }
    const defaultAvatar =
      "https://raw.githubusercontent.com/nz-m/public-files/main/dp.jpg";
    const fileUrl = req.files?.[0]?.filename
      ? `${req.protocol}://${req.get("host")}/assets/userAvatars/${
          req.files[0].filename
        }`
      : defaultAvatar;

    const checkuser = await User.findById(userId);

    if (checkuser.avatar && !checkuser.avatar.includes("default-avatar")) {
      const oldFilePath = path.join(
        __dirname,
        "../../assets/userAvatars",
        path.basename(checkuser.avatar)
      );

      deleteFile(oldFilePath);
    }

    // Update the user's avatar in the database
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar: fileUrl },
      { new: true } // Return the updated user
    );

    if (!user) {
      const filePath = path.join(
        __dirname,
        `./assets/userAvatars/${req.files[0].filename}`
      );
      deleteFile(filePath);

      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Avatar updated successfully!",
      data: { avatar: user.avatar },
    });
  } catch (error) {
    const filePath = path.join(
      __dirname,
      `../../assets/userAvatars/${req.files[0].filename}`
    );
    deleteFile(filePath);

    return res.status(500).json({
      success: false,
      message: "Server error while updating avatar.",
      error: error.message,
    });
  }
};

const getSingleUserbyId = async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select("-password");
    // await user.populate("post");

    res.status(200).json({
      message: "user Found successfully",
      data: user,
      success: true,
      error: false,
    });
  } catch (error) {
    console.log(error);
    return next(errorHandler(400, "internal server error"));
  }
};
// const updatePassword = async (req, res, next) => {
//   const { oldPassword, password } = req.body;

//   try {
//     // Ensure both `oldPassword` and `password` are provided
//     if (!oldPassword || !password) {
//       return next(
//         errorHandler(400, "Both old and new passwords are required.")
//       );
//     }

//     // Fetch the user from the database
//     const user = await User.findById(req.userId);
//     if (!user) {
//       return next(errorHandler(404, "User not found."));
//     }

//     // Verify the old password
//     const isValidPassword = await bcrypt.compare(oldPassword, user.password);
//     if (!isValidPassword) {
//       return next(errorHandler(400, "Old password is incorrect."));
//     }

//     // Check if the new password is the same as the old password
//     const isSamePassword = await bcrypt.compare(password, user.password);
//     if (isSamePassword) {
//       return next(
//         errorHandler(400, "New password must be differen the old password.")
//       );
//     }

//     // Update the password in the database
//     user.password = password;
//     await user.save();

//     // Respond with success
//     res.status(200).json({
//       message: "Password updated successfully.",
//       user: user,
//       success: true,
//       error: false,
//     });
//   } catch (error) {
//     console.error("Error updating password:", error.message);
//     return next(errorHandler(500, "Internal server error."));
//   }
// };

const updateUserInfo = async (req, res, next) => {
  const { username, email } = req.body;

  try {
    // Check if the user is authenticated (assumes `req.userId` is set by  middleware)
    const userId = req.userId;
    if (!userId) {
      return next(errorHandler(401, "Unauthorized. Please log in."));
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "User not found."));
    }

    // Update the fields provided in the request
    if (username) user.username = username;
    if (email) user.email = email;

    // Save the updated user to the database
    await user.save();

    // Respond with the updated user info
    res.status(200).json({
      message: "User information updated successfully.",
      success: true,
      data: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error updating user info:", error.message);
    return next(errorHandler(500, "Internal server error."));
  }
};

const followunfollow = async (req, res, next) => {
  try {
    const followerId = req.userId; // User initiating the follow/unfollow
    const targetUserId = req.params.id; // User to be followed/unfollowed

    // Validate that the follower and target user are not the same
    if (followerId === targetUserId) {
      return res.status(400).json({
        message: "You cannot follow or unfollow yourself.",
        success: false,
        error: true,
      });
    }

    // Fetch both users simultaneously
    const [user, targetUser] = await Promise.all([
      User.findById(followerId),
      User.findById(targetUserId),
    ]);

    // Check if both users exist
    if (!user || !targetUser) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
        error: true,
      });
    }

    const isFollowing = user.following.includes(targetUserId);

    if (isFollowing) {
      // Unfollow logic
      await Promise.all([
        User.findByIdAndUpdate(followerId, {
          $pull: { following: targetUserId },
        }),
        User.findByIdAndUpdate(targetUserId, {
          $pull: { follower: followerId },
        }),
      ]);
      const user = await User.findById(targetUserId);
      const user2 = await User.findById(followerId);
      return res.status(200).json({
        message: "Unfollowed successfully.",
        following: user2.following,
        follower: user.follower,
        success: true,
        error: false,
      });
    } else {
      // Follow logic
      await Promise.all([
        User.findByIdAndUpdate(followerId, {
          $addToSet: { following: targetUserId },
        }),
        User.findByIdAndUpdate(targetUserId, {
          $addToSet: { follower: followerId },
        }),
      ]);
      const user = await User.findById(targetUserId);
      const user2 = await User.findById(followerId);

      return res.status(200).json({
        message: "Followed successfully.",
        follower: user.follower,
        following: user2.following,
        success: true,
        error: false,
      });
    }
  } catch (error) {
    console.error("Error in followOrUnfollow:", error.message);
    next(errorHandeler(500, "Internal server error."));
  }
};
const getFollowers = async (req, res, next) => {
  const userId = req.params.id; // The ID of the user whose followers are to be retrieved

  try {
    // Fetch the user and populate the followers list
    const user = await User.findById(userId).populate(
      "follower",
      "name email avatar"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      message: "Followers retrieved successfully.",
      success: true,
      data: user.follower, // List of followers with selected fields
    });
  } catch (error) {
    console.error("Error fetching followers:", error.message);
    return next(errorHandler(500, "Internal server error."));
  }
};
const addRemoveToBookmark = async (req, res, next) => {
  try {
    const postId = req.params.id;

    // Fetch the user by ID
    const user = await User.findById(req.userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
        error: true,
      });
    }

    // Check if the post is already bookmarked
    const isAlreadyBookmarked = user.Bookmark.includes(postId);

    if (isAlreadyBookmarked) {
      // Remove from bookmark
      await User.findByIdAndUpdate(req.userId, {
        $pull: { Bookmark: postId },
      });

      return res.status(200).json({
        message: "Post removed from bookmark successfully.",
        success: true,
        error: false,
      });
    } else {
      // Add to bookmark
      await User.findByIdAndUpdate(req.userId, {
        $addToSet: { Bookmark: postId },
      });

      return res.status(200).json({
        message: "Post added to bookmark successfully.",
        success: true,
        error: false,
      });
    }
  } catch (error) {
    console.error("Error in addRemoveToBookmark:", error.message);
    next(errorHandler(500, "Internal server error."));
  }
};
const sugggestFrinend = async (req, res) => {
  try {
    const loggedInUser = req.userId;

    // লগ ইন করা ইউজার কাদের ফলো করছে তা বের করা
    const user = await User.findById(loggedInUser)
      .populate("friends", "_id")
      .populate("friendRequests", "_id")
      .populate("sentFriendRequests", "_id");

    // নিজেকে বাদ দিয়ে যারা ফলো করা হয়নি এমন ইউজার সাজেস্ট করা
    const suggestedUsers = await User.find({
      _id: {
        $nin: [
          loggedInUser,
          ...user.friends.map((u) => u._id),
          ...user.friendRequests.map((u) => u._id),
          ...user.sentFriendRequests.map((u) => u._id),
        ],
      },
    })
      .limit(5)
      .select("username avatar");

    res.status(200).json({
      success: true,
      message: "Suggested users fetched successfully.",
      data: suggestedUsers,
      error: false,
    });
  } catch (error) {
    console.log(error.message);
    return next(errorHandler(500, "Internal server error."));
  }
};
const sendFriendRequest = async (req, res) => {
  try {
    const { id } = req.params; // যাকে friend request পাঠানো হবে
    const loggedInUser = req.userId;

    if (id === loggedInUser) {
      return res
        .status(400)
        .json({ message: "You cannot send a friend request to yourself." });
    }

    const userToRequest = await User.findById(id);
    const currentUser = await User.findById(loggedInUser);

    if (!userToRequest || !currentUser) {
      return res.status(404).json({ message: "User not found." });
    }

    if (userToRequest.friendRequests.includes(loggedInUser)) {
      return res.status(400).json({ message: "Friend request already sent." });
    }

    userToRequest.friendRequests.push(loggedInUser);
    currentUser.sentFriendRequests.push(id);
    await userToRequest.save();
    await currentUser.save();

    res
      .status(200)
      .json({ message: "Friend request sent successfully.", success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};
const getpendingFriends = async (req, res) => {
  try {
    const loggedInUser = req.userId;

    // লগ ইন করা ইউজার কাদের ফলো করছে তা বের করা
    const user = await User.findById(loggedInUser).populate(
      "friendRequests",
      "_id username avatar"
    );

    res.status(200).json({
      success: true,
      message: "pending users fetched successfully.",
      data: user.friendRequests,
      error: false,
    });
  } catch (error) {
    console.log(error.message);
    return next(errorHandler(500, "Internal server error."));
  }
};
const cancelFriendRequest = async (req, res) => {
  try {
    const { id } = req.params; // যাকে রিকোয়েস্ট বাতিল করা হবে
    const loggedInUser = req.userId;

    const userToCancel = await User.findById(id);
    const currentUser = await User.findById(loggedInUser);

    if (!userToCancel || !currentUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // যদি রিকোয়েস্ট ইতিমধ্যে না থাকে, তাহলে বাতিল করা যাবে না
    if (!currentUser.friendRequests.includes(id)) {
      return res.status(400).json({ message: "No friend request to cancel." });
    }

    // উভয় ইউজারের লিস্ট থেকে রিমুভ করা
    currentUser.friendRequests = currentUser.sentFriendRequests.filter(
      (userId) => userId.toString() !== id
    );

    userToCancel.sentFriendRequests = userToCancel.friendRequests.filter(
      (userId) => userId.toString() !== loggedInUser
    );

    await currentUser.save();
    await userToCancel.save();

    res.status(200).json({
      message: "Friend request canceled successfully.",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};
const acceptFriendRequest = async (req, res) => {
  try {
    const { id } = req.params; // যিনি রিকোয়েস্ট পাঠিয়েছেন
    const loggedInUser = req.userId; // যিনি অ্যাক্সেপ্ট করছেন

    const senderUser = await User.findById(id);
    const receiverUser = await User.findById(loggedInUser);

    if (!senderUser || !receiverUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // চেক করা হচ্ছে, রিকোয়েস্টটি আছে কিনা
    if (!receiverUser.friendRequests.includes(id)) {
      return res.status(400).json({ message: "No friend request found." });
    }

    // উভয় ইউজারের friends লিস্ট আপডেট করা
    receiverUser.friends.push(id);
    senderUser.friends.push(loggedInUser);

    // friendRequests এবং sentFriendRequests থেকে রিকোয়েস্ট রিমুভ করা
    receiverUser.friendRequests = receiverUser.friendRequests.filter(
      (userId) => userId.toString() !== id
    );

    senderUser.sentFriendRequests = senderUser.sentFriendRequests.filter(
      (userId) => userId.toString() !== loggedInUser
    );

    await receiverUser.save();
    await senderUser.save();

    res
      .status(200)
      .json({ message: "Friend request accepted.", success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};
const addStory = async (req, res) => {
  try {
    const media = req.files[0];
    if (!media) return next(errorHandler(400, "image is required"));
    const optimizedImageBuffer = await sharp(media.buffer)
      .resize({ width: 800, height: 800, fit: "inside" })
      .toFormat("jpeg", { quality: 80 })
      .toBuffer();
    const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
      "base64"
    )}`;
    const cloudinaryResponse = await cloudinary.uploader.upload(fileUri);
    publicId = cloudinaryResponse.public_id;

    const story = new Story({
      user: req.userId,
      media: cloudinaryResponse.secure_url,
    });
    await story.populate("user", "avatar username");
    await story.save();
    res.status(201).json({
      data: story,
      success: true,
      message: "Story added successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server error" });
  }
};
const getStory = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ নিজের এবং ফ্রেন্ডদের Story দেখানো
    const stories = await Story.find({
      user: { $in: [req.userId, ...user.friends] }, // 👈 নিজের আইডি যোগ করা হয়েছে
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }, // ২৪ ঘণ্টার মধ্যে যেগুলো
    })
      .populate("user", "username avatar")
      .sort({ createdAt: -1 });

    return res.json({ success: true, data: stories });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getStory,
  addStory,
  getinfo,
  updateAvatar,
  getSingleUserbyId,
  updateUserInfo,
  followunfollow,
  getFollowers,
  addRemoveToBookmark,
  sugggestFrinend,
  sendFriendRequest,
  getpendingFriends,
  cancelFriendRequest,
  acceptFriendRequest,
};
