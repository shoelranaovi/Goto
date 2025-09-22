const User = require("../model/user.model");
const errorHandler = require("./errorhandler");

/**
 * Middleware to verify the user's role from the database.
 * @param {string} requiredRole - The role required to access the resource. Default: "Admin".
 * @returns {Function} Middleware function.
 */
const RoleCheck =
  (requiredRole = "Admin") =>
  async (req, res, next) => {
    try {
      // Extract user ID from request (assume it's set by an authentication middleware)
      const userId = req.userId; // Ensure `userId` is set in a prior middleware (e.g., JWT auth)

      if (!userId) {
        return next(
          errorHandler(403, "Unauthorized access. User ID is missing.")
        );
      }

      // Fetch user from the database
      const user = await User.findById(userId);

      if (!user) {
        return next(errorHandler(404, "User not found."));
      }

      // Check the user's role
      if (user.role !== requiredRole) {
        return next(
          errorHandler(403, `Access denied. Requires role: ${requiredRole}.`)
        );
      }

      // Proceed to the next middleware if the role matches
      next();
    } catch (error) {
      // Handle unexpected errors
      next(errorHandler(500, "An error occurred during role verification."));
    }
  };

module.exports = RoleCheck;
