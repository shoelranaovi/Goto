const errorHandler = require("../../middleware/errorhandler");
const User = require("../../model/user.model");

const getAlluser = async (req, res, next) => {
  try {
    // Fetch all users with selected fields
    const allUsers = await User.find({}, "_id email role").lean();

    if (!allUsers || allUsers.length === 0) {
      return res.status(404).json({
        message: "No users found",
        data: [],
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      message: "Users retrieved successfully",
      data: allUsers,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return next(errorHandler(500, "Internal server error"));
  }
};
const deleteuser = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Invalid user ID format",
        success: false,
        error: true,
      });
    }

    // Check if the user exists
    const userToDelete = await User.findById(id);
    if (!userToDelete) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    // Perform deletion
    await userToDelete.deleteOne();

    res.status(200).json({
      message: "User deleted successfully",
      data: {
        id: userToDelete._id,
        email: userToDelete.email,
        role: userToDelete.role,
      },
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error deleting user:", error.message);

    return next({
      status: 500,
      message: "Internal server error",
      success: false,
      error: true,
    });
  }
};

const updateUser = async (req, res, next) => {
  const { role } = req.body;

  try {
    // Check if the user is authenticated (assumes `req.userId` is set by  middleware)
    const userId = req.params.id;
    if (!userId) {
      return next(errorHandler(401, "Unauthorized. Please log in."));
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "User not found."));
    }

    // Update the fields provided in the request

    if (role) user.role = role;

    // Save the updated user to the database
    await user.save();

    // Respond with the updated user info
    res.status(200).json({
      message: "User information updated successfully.",
      success: true,
      data: {
        role: user.role,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error updating user info:", error.message);
    return next(errorHandler(500, "Internal server error."));
  }
};

module.exports = { getAlluser, deleteuser, updateUser };
