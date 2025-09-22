const {
  createUser,
  login,
  sendVerificationEmail,
  verifyLink,
  logout,
  resendOpt,
  verifyotp,
  getinfo,
  forgetPass,
  updatePassword,
  verifyLinkForgetPass,
} = require("../../controllerRoute/Auth/user.controller");

const rateLimiters = require("../../middleware/limit/limit-rate");
const {
  addUserValidator,
  addUserValidatorHandler,
} = require("../../middleware/validators/adduserValidator");
const verifyToken = require("../../middleware/verifyuser");

const Router = require("express").Router();

// Router.use(rateLimiters.signUpSignInLimiter);
Router.get("/logout", logout);
Router.post("/add", createUser);
Router.get("/verify", verifyLink);
Router.post("/verifyotp", verifyotp);
Router.post("/resendOtp", resendOpt);
Router.post("/login", login);

Router.post("/forgetPass", forgetPass);
Router.get("/changepass", verifyLinkForgetPass);
Router.post("/updatepasss", updatePassword);
Router.use(verifyToken);
Router.get("/userinfo", getinfo);

module.exports = Router;

//api/auth/add
//api/auth/resendOtp
//api/auth/verify
//api/auth/verifyotp
//api/auth/userinfo
//api/auth/logout
//api/auth/login
//api/auth/forgetPass
