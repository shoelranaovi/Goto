const jwt = require("jsonwebtoken");
const generateJwtToken = require("./generateToken");

const sendToken = (user, statusCode, res) => {
  const tokendata = {
    userId: user._id,
  };

  const token = generateJwtToken(tokendata);

  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    error: false,
    data: user,
    token,
  });
};

module.exports = sendToken;
