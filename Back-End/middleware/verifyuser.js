const jwt = require("jsonwebtoken");
const errorHandler = require("./errorhandler");

async function verifyToken(req, res, next) {
  try {
    const token = req.cookies?.token
    

    if (!token) {
      return next(errorHandler(405, "unautorize"));
    }

    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        return res.status(400).json({ message: "token not found" });
      }
      req.userId = decoded.userId;

      next();
    });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
}

module.exports = verifyToken;
