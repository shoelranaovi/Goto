const passport = require("passport");
const keys = require("../../confiq/keys");
const jwt = require("jsonwebtoken");
const sendToken = require("../../utils/Token/sendToken");
const generateJwtToken = require("../../utils/Token/generateToken");

const googleRouter = require("express").Router();

googleRouter.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
    accessType: "offline",
    approvalPrompt: "force",
  })
);

googleRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${keys.app.clientURL}/login`,
    session: false,
  }),
  (req, res) => {
    const payload = {
      userId: req.user.id,
    };

    const token = generateJwtToken(payload);

    // Options for cookies
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };

    res
      .status(200)
      .cookie("token", token, options)
      .redirect(`${keys.app.clientURL}/`);
  }
);

googleRouter.get(
  "/facebook",
  passport.authenticate("facebook", {
    session: false,
    scope: ["public_profile", "email"],
  })
);

googleRouter.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: `${keys.app.clientURL}/login`,
    session: false,
  }),
  (req, res) => {
    const payload = {
      userId: req.user.id,
    };
    console.log(payload);

    const token = generateJwtToken(payload);

    // Options for cookies
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };

    res
      .status(200)
      .cookie("token", token, options)
      .redirect(`${keys.app.clientURL}/`);
  }
);

module.exports = googleRouter;
