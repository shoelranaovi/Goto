const isEmail = (value) => {
  // Check if the value is empty (undefined, null, object with no keys, or an empty string)
  if (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  ) {
    return false;
  }

  // Regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if the value matches the email pattern
  return emailRegex.test(value);
};

module.exports = isEmail;
