const errorHandler = require("./middleware/errorhandler");

const demo = async (req, res, next) => {
  try {
    res.status(200).json({
      message: "Hello, World!",
      data: "data",
      error: false,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    next(errorHandler(401, "Internal Server Error"));
  }
};
