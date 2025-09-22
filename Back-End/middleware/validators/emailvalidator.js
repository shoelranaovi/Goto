const { check, validationResult } = require("express-validator");

const User = require("../../model/user.model");

const addMagicUserValidator = [
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw new Error(
            "There is already an account associated with this email address"
          );
        }
      } catch (err) {
        throw err;
      }
    }),
];

const addmagicValidatorHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(400).json({
      errors: Object.values(mappedErrors).map((error) => error.msg),
      success: false,
      error: true,
    });
  }
};

module.exports = {
  addMagicUserValidator,
  addmagicValidatorHandler,
};
