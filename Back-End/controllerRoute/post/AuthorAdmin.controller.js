const Post = require("../../model/post.model");
const fs = require("fs");
const sharp = require("sharp");
const path = require("path");
const errorHandler = require("../../middleware/errorhandler");
const mongoose = require("mongoose");
const Comment = require("../../model/comment.model");
const cloudinary = require("../../confiq/claudinary");
const formatComments  = require("../../helpers/formatComments");

/// todo for multiple file
// const createpost = async (req, res, next) => {
//   const image = req.files[0];
//   let publicId = null;

//   try {
//     if (!image) return next(errorHandler(400, "image is required"));
//     const optimizedImageBuffer = await sharp(image.buffer)
//       .resize({ width: 800, height: 800, fit: "inside" })
//       .toFormat("jpeg", { quality: 80 })
//       .toBuffer();
//     const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
//       "base64"
//     )}`;
//     const cloudinaryResponse = await cloudinary.uploader.upload(fileUri);
//     publicId = cloudinaryResponse.public_id;

//     const newPost = new Post({
//       author: req.userId,
//       Images: image ? cloudinaryResponse.secure_url : null,
//       privacy: req.body.privacy,
//       content: req.body.content,
//     });

//     const savedPost = await newPost.save();
//     const postId = savedPost._id;

//     const post = await Post.findById(postId).lean().populate("author");

//     res.status(200).json({
//       message: "Post created successfully",
//       data: post,
//       error: true,
//       success: true,
//     });
//   } catch (error) {
//     console.log(error.message);

//     // যদি কোনো সমস্যা হয়, Cloudinary থেকে ইমেজ মুছে ফেলা হবে
//     if (publicId) {
//       try {
//         await cloudinary.uploader.destroy(publicId);
//         console.log("Image deleted from Cloudinary due to an error.");
//       } catch (deleteError) {
//         console.log(
//           "Failed to delete image from Cloudinary:",
//           deleteError.message
//         );
//       }
//     }

//     return res.status(500).json({
//       message: "Error creating post",
//     });
//   }
// };
const createpost = async (req, res, next) => {
  const Images = req.files; // ⬅️ Multiple images
  let uploadedImages = [];
  let uploadedPublicIds = [];

  

  try {
    if (!Images || Images.length === 0) {
      return next(errorHandler(400, "At least one image is required"));
    }

    // 🔹 Loop করে প্রতিটি ইমেজ প্রসেস করা
    for (const image of Images) {
      const optimizedImageBuffer = await sharp(image.buffer)
        .resize({ width: 800, height: 800, fit: "inside" })
        .toFormat("jpeg", { quality: 80 })
        .toBuffer();
      const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString("base64")}`;

      const cloudinaryResponse = await cloudinary.uploader.upload(fileUri);
      uploadedImages.push(cloudinaryResponse.secure_url);
      uploadedPublicIds.push(cloudinaryResponse.public_id);
    }

    // 🔹 নতুন পোস্ট তৈরি করা
    const newPost = new Post({
      author: req.userId,
      Images: uploadedImages, // ✅ Multiple images
      privacy: req.body.privacy,
      content: req.body.content,
    });

    const savedPost = await newPost.save();
    const postId = savedPost._id;

    const post = await Post.findById(postId).lean().populate("author");

    res.status(200).json({
      message: "Post created successfully",
      data: post,
      error: false,
      success: true,
    });
  } catch (error) {
    console.log(error.message);

    // 🔹 যদি কোনো সমস্যা হয়, Cloudinary থেকে সব ইমেজ মুছে ফেলা হবে
    if (uploadedPublicIds.length > 0) {
      try {
        for (const publicId of uploadedPublicIds) {
          await cloudinary.uploader.destroy(publicId);
        }
        console.log("Images deleted from Cloudinary due to an error.");
      } catch (deleteError) {
        console.log("Failed to delete images from Cloudinary:", deleteError.message);
      }
    }

    return res.status(500).json({
      message: "Error creating post",
    });
  }
};

const update = async (req, res, next) => {
  const { filesData } = req;

  try {
    // Find the existing post
    const post = await Post.findById(req.params.id);
    if (!post) {
      return next(errorHandler(404, "Post not found"));
    }

    let imageLinks = [];
    if (filesData && filesData.length > 0) {
      imageLinks = filesData.map((file) => file.fileUrl);

      // If the post already has images, delete the old ones
      if (post.Images && post.Images.length > 0) {
        post.Images.forEach((image) => {
          const filePath = path.join(
            __dirname,
            "../../assets/userFiles",
            path.basename(image)
          );

          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(`Error deleting file ${filePath}:`, err.message);
            } else {
              console.log(`File ${filePath} deleted successfully`);
            }
          });
        });
      }
    }

    // Update the post with new data
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          Images: filesData && filesData.length > 0 ? imageLinks : post.Images,
          ...req.body,
        },
      },
      { new: true }
    );

    if (!updatedPost) {
      return next(errorHandler(404, "Failed to update post"));
    }

    res.status(200).json({
      message: "Post updated successfully",
      data: updatedPost,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error updating post:", error.message);

    // Cleanup newly uploaded files in case of an error
    if (filesData && filesData.length > 0) {
      filesData.forEach((file) => {
        const filePath = path.join(
          __dirname,
          "../../assets/userFiles",
          path.basename(file.fileUrl)
        );

        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error deleting file ${filePath}:`, err.message);
          } else {
            console.log(`File ${filePath} deleted successfully after error`);
          }
        });
      });
    }

    return next(errorHandler(500, "Internal server error"));
  }
};
const deletepost = async (req, res, next) => {
  try {
    // Find the existing post
    const post = await Post.findById(req.params.id);
    if (!post) {
      return next(errorHandler(404, "Post not found"));
    }

    // If the post already has images, delete the old ones
    if (post.Images && post.Images.length > 0) {
      post.Images.forEach((image) => {
        const filePath = path.join(
          __dirname,
          "../../assets/userFiles",
          path.basename(image)
        );

        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error deleting file ${filePath}:`, err.message);
          } else {
            console.log(`File ${filePath} deleted successfully`);
          }
        });
      });
    }

    const deletepos = await Post.findByIdAndDelete(req.params.id);

    // Update the post with new data

    res.status(200).json({
      message: "Post updated successfully",
      data: deletepos,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error delete post:", error.message);
    return next(errorHandler(500, "Internal server error"));
  }
};
const getAllPost = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort = "-createdAt" } = req.query;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const posts = await Post.find({})
      .sort(sort)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .populate("author") // ✅ Populate author details
      .populate("like") // ✅ Populate likes
      .populate({
        path: "comment", // ✅ Populate comments
        populate: { path: "userId", select: "username avatar" }, // ✅ Populate user details inside comments
      });

    const totalPosts = await Post.countDocuments();

    // ✅ Ensure comments are formatted with nested replies
    const formattedPosts = posts.map((post) => ({
      ...post.toObject(), // Convert Mongoose document to plain JS object
      comment: formatComments(post.comment), // Apply formatting
    }));

    res.status(200).json({
      message: "Posts retrieved successfully",
      data: formattedPosts,
      pagination: {
        totalPosts,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalPosts / limitNumber),
        limit: limitNumber,
      },
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error retrieving posts:", error.message);
    next(errorHandler(500, "Internal Server Error"));
  }
};


const getpostByid = async (req, res, next) => {
  try {
    const { id } = req.params;

    const findblog = await Post.find({ slug: id })
      .populate("author", "role username avatar")
      .populate({
        path: "comment",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "userId", // Populate user details inside each comment
        },
      });
    if (!findblog) {
      return next(errorHandler(400, "blog not found"));
    }
    // const comment = await Comment.find({ postId: id }).populate(
    //   "user",
    //   "username email "
    // );
    const post = findblog[0];

    res.status(200).json({
      data: post,
      // comment: comment,
      success: true,
      error: false,
    });
  } catch (error) {
    console.log(error);
    return next(errorHandler(400, error.message));
  }
};
// const getPosts = async (req, res, next) => {
//   try {
//     const startIndex = parseInt(req.query.startIndex) || 0;
//     const limit = parseInt(req.query.limit) || 9;
//     const sortDirection = req.query.order === "asc" ? 1 : -1;
//     const posts = await Post.find({
//       ...(req.query.userId && { userId: req.query.userId }),
//       ...(req.query.category && { category: req.query.category }),
//       ...(req.query.slug && { slug: req.query.slug }),
//       ...(req.query.postId && { _id: req.query.postId }),
//       ...(req.query.searchTerm && {
//         $or: [
//           { title: { $regex: req.query.searchTerm, $options: "i" } },
//           { content: { $regex: req.query.searchTerm, $options: "i" } },
//         ],
//       }),
//     })
//       .populate("author")
//       .populate("like")
//       .populate("comment")
//       .sort({ updatedAt: sortDirection })
//       .skip(startIndex)
//       .limit(limit);

//     const totalPosts = await Post.countDocuments();

//     const now = new Date();

//     const oneMonthAgo = new Date(
//       now.getFullYear(),
//       now.getMonth() - 1,
//       now.getDate()
//     );

//     const lastMonthPosts = await Post.countDocuments({
//       createdAt: { $gte: oneMonthAgo },
//     });

//     res.status(200).json({
//       posts,
//       totalPosts,
//       lastMonthPosts,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const releatedpost = async (req, res, next) => {
  const { id } = req.params;
  try {
    // Validate the blog post ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid post ID.",
      });
    }
    // Find the original post
    const blogPost = await Post.findById(id).select("title");
    if (!blogPost) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Post not found.",
      });
    }

    // Create a regex pattern for the title (escaping special characters)
    const titleRegex = new RegExp(
      blogPost.title
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        .split(" ")
        .join("|"),
      "i"
    );

    // Query to find related posts (excluding the current one)
    const relatedQuery = {
      _id: { $ne: id },
      title: { $regex: titleRegex },
    };

    // Fetch related posts with a limit and projection
    const relatedPosts = await Post.find(relatedQuery)
      .select("title description createdAt") // Return only necessary fields
      .limit(5); // Limit the number of related posts

    // Response with related posts
    res.status(200).json({
      success: true,
      error: false,
      data: relatedPosts,
    });
  } catch (error) {
    console.error(error);
    next(errorHandler(400, "error occoured")); // Pass the error to the error handler middleware
  }
};
const likeOrUnlikePost = async (req, res, next) => {
  try {
    const postId = req.params.id;

    // Fetch the user by ID
    const post = await Post.findById(req.params.id);

    // Check if the user exists
    if (!post) {
      return res.status(404).json({
        message: "post not found.",
        success: false,
        error: true,
      });
    }

    // Check if the post is already bookmarked
    const isAlreadylike = post.like.includes(req.userId);

    if (isAlreadylike) {
      // Remove from bookmark
      await Post.findByIdAndUpdate(req.params.id, {
        $pull: { like: req.userId },
      });
      const Singleposts = await Post.findById(req.params.id).populate("like");

      return res.status(200).json({
        message: "Post unlike  successfully.",
        post: Singleposts,
        success: true,
        error: false,
      });
    } else {
      // Add to bookmark
      await Post.findByIdAndUpdate(req.params.id, {
        $addToSet: { like: req.userId },
      });
      const Singleposts = await Post.findById(req.params.id).populate("like");

      return res.status(200).json({
        message: "Post like  successfully.",
        post: Singleposts,
        success: true,
        error: false,
      });
    }
  } catch (error) {
    console.error("Error in like/unlike:", error.message);
    next(errorHandler(500, "Internal server error."));
  }
};

const addcomment = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const authorId = req.userId;
    const { comment } = req.body;

    if (!comment) return next(errorHandler(400, "Comment is required"));

    const post = await Post.findById(postId);
    if (!post) return next(errorHandler(404, "Post not found"));

    const newComment = await Comment.create({ comment, userId: authorId, postId });

    await Post.findByIdAndUpdate(postId, { $push: { comment: newComment._id } });

    const updatedPost = await Post.findById(postId)
      .populate({
        path: "comment",
        populate: { path: "userId" },
      });

    res.status(200).json({
      message: "Comment added successfully",
      comments: formatComments(updatedPost.comment),
      success: true,
      error: false,
    });
  } catch (error) {
    console.error(error);
    next(errorHandler(500, "Internal Server Error"));
  }
};

// const addreplycomment = async (req, res, next) => {
//   try {
//     const postId = req.params.id;
//     const authorId = req.userId;
//     const { comment,parentId  } = req.body;
//     console.log(req.body);

//     const post = await Post.findById(postId);
//     if (!comment) return next(errorHandler(400, "comment is required"));

//     const newcomment = new Comment({
//       comment,
//       userId: authorId,
//       postId: postId,
//       parentId: parentId || null
//     });
//     const savecomment = await newcomment.save();

//     post.comment.push(savecomment._id);
//     const savepost = await post.save();
//     const populatedPost = await savepost.populate({
//       path: "comment", // Ensure the correct reference
//       options: { sort: { createdAt: -1 } }, // ✅ Sorting comments by newest first
//       populate: {
//         path: "userId", // ✅ Populate user details inside each comment
//       },
//     });
//     const structuredComments = populatedPost.comment.filter(c => !c.parentId).map(parent => ({
//       ...parent.toObject(),
//       replies: populatedPost.comment.filter(c => String(c.parentId) === String(parent._id)),
//     }));

//     res.status(200).json({
//       message: "comment done",
//       comments: structuredComments,
//       success: true,
//       error: false,
//     });
//   } catch (error) {
//     console.log(error);
//     return next(errorHandler(400, "internal server error"));
//   }
// };
const addReplyComment = async (req, res, next) => {
  try {
    const { id: postId } = req.params;
    const { comment, parentId } = req.body;
    
    const authorId = req.userId;

    if (!comment) return next(errorHandler(400, "Comment is required"));

    const post = await Post.findById(postId);
    if (!post) return next(errorHandler(404, "Post not found"));

    if (parentId) {
      const parentComment = await Comment.findById(parentId);
      if (!parentComment) return next(errorHandler(404, "Parent comment not found"));
    }

    const newComment = await Comment.create({ comment, userId: authorId, postId, parentId });

    await Post.findByIdAndUpdate(postId, { $push: { comment: newComment._id } });

    const updatedPost = await Post.findById(postId)
      .populate({
        path: "comment",
        populate: { path: "userId" },
      });

    res.status(200).json({
      message: "Reply added successfully",
      comments: formatComments(updatedPost.comment),
      success: true,
      error: false,
    });
  } catch (error) {
    console.error(error);
    next(errorHandler(500, "Internal Server Error"));
  }
};
const addlikeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    

    if (!comment) return next(errorHandler(400, "Comment is required"));
     
    const userId = req.userId;
    const liked = comment.likes.includes(userId);

    if (liked) {
      comment.likes.pull(userId);
    } else {
      comment.likes.push(userId);
    }
    await comment.save();



    res.status(200).json({
     message: liked ? "Unliked" : "Liked",
      likes:comment.likes,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error(error);
    next(errorHandler(500, "Internal Server Error"));
  }
};



module.exports = {
  createpost,
  update,
  deletepost,
  getAllPost,
  getpostByid,
  releatedpost,
  likeOrUnlikePost,
  addcomment,
  addReplyComment,
  addlikeComment
};
