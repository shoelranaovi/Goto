const transporter = require("../../confiq/nodemailer");
const Mailverify = require("../../model/mailverify.model");
const { verifyEmailHTML } = require("../Tamplate/mailtamplate");
const generateJwtToken = require("../Token/generateToken");

const sendVerificationEmail = async (data, res) => {
  const USER = process.env.EMAIL;
  const PASS = process.env.PASSWORD;
  const { email, username } = data;

  const verificationCode = Math.floor(10000 + Math.random() * 90000);
  const tokendata = {
    email,
    verificationCode,
  };

  const token = generateJwtToken(tokendata);

  const verificationLink = `http://localhost:3000/api/auth/verify?token=${token}`;

  try {
    let info = await transporter.sendMail({
      from: `"Blogify" <${USER}>`,
      to: email,
      subject: "Verify your email address",
      html: verifyEmailHTML(username, verificationLink, verificationCode),
    });

    const newVerification = new Mailverify({
      email,
      verificationCode,
      messageId: info.messageId,
      for: "signup",
    });

    await newVerification.save();

    res.status(200).json({
      success: true,
      error: false,
      message: `Verification email was successfully sent to ${email}`,
    });
  } catch (err) {
    console.log(
      "Could not send verification email. There could be an issue with the provided credentials or the email service."
    );
    res.status(500).json({ message: "Something went wrong" });
  }
};
const sendVerificationEmailforMagiclinklogIn = async (data, res) => {
  const USER = process.env.EMAIL;
  const PASS = process.env.PASSWORD;
  const { email, username } = data;

  const verificationCode = Math.floor(10000 + Math.random() * 90000);
  const tokendata = {
    email,
    verificationCode,
  };

  const token = generateJwtToken(tokendata);

  const verificationLink = `http://localhost:3000/api/auth/magicLink/verifylogin?token=${token}`;

  try {
    let info = await transporter.sendMail({
      from: `"Blogify" <${USER}>`,
      to: email,
      subject: "Verify your email address",
      html: verifyEmailHTML(username, verificationLink, verificationCode),
    });

    const newVerification = new Mailverify({
      email,
      verificationCode,
      messageId: info.messageId,
      for: "logIn",
    });

    await newVerification.save();

    res.status(200).json({
      success: true,
      message: `Verification email was successfully sent to ${email}`,
    });
  } catch (err) {
    console.log(
      "Could not send verification email. There could be an issue with the provided credentials or the email service."
    );
    res.status(500).json({ message: "Something went wrong" });
  }
};
const sendVerificationEmailForForgetpass = async (data, res) => {
  const USER = process.env.EMAIL;
  const PASS = process.env.PASSWORD;
  const { email, username } = data;

  const verificationCode = Math.floor(10000 + Math.random() * 90000);
  const tokendata = {
    email,
    verificationCode,
  };

  const token = generateJwtToken(tokendata);

  const verificationLink = `http://localhost:3000/api/auth/changepass?token=${token}`;

  try {
    let info = await transporter.sendMail({
      from: `"Blogify" <${USER}>`,
      to: email,
      subject: "Verify your email address",
      html: verifyEmailHTML(username, verificationLink, verificationCode),
    });

    const newVerification = new Mailverify({
      email,
      verificationCode,
      messageId: info.messageId,
      for: "Forget-pass",
    });

    await newVerification.save();

    res.status(200).json({
      success: true,
      error: false,
      message: `Verification email was successfully sent to ${email}`,
    });
  } catch (err) {
    console.log(
      "Could not send verification email. There could be an issue with the provided credentials or the email service."
    );
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  sendVerificationEmail,
  sendVerificationEmailforMagiclinklogIn,
  sendVerificationEmailForForgetpass,
};
