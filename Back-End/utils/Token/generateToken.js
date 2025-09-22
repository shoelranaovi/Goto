const jwt = require("jsonwebtoken");

/**
 * Generates a JWT token with the given payload and options.
 * @param {Object} data - The payload to encode in the token.
 * @param {string} secretKey - The secret key for signing the token.
 * @param {string} [expiresIn='10m'] - Expiration time for the token.
 * @returns {string} - The signed JWT token.
 * @throws {Error} - If token generation fails.
 */
const generateJwtToken = (
  data,
  secretKey = process.env.SECRET_KEY,
  expiresIn = "2h"
) => {
  try {
    if (!secretKey) {
      throw new Error("Secret key is required to generate a token.");
    }

    const token = jwt.sign(data, secretKey, { expiresIn });
    return token;
  } catch (error) {
    console.error("Error generating JWT token:", error.message);
    throw error; // Re-throw the error to handle it at a higher level
  }
};

module.exports = generateJwtToken;
