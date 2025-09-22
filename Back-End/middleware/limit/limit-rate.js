const rateLimit = require("express-rate-limit");

// Constants for time durations
const ONE_MINUTE = 60 * 1000;
const ONE_HOUR = 60 * ONE_MINUTE;

// Default rate limit message
const DEFAULT_MESSAGE = "Too Many Attempts, please try again later.";

/**
 * Creates a rate limiter instance.
 * @param {number} windowMs - Time window in milliseconds.
 * @param {number} max - Maximum number of requests allowed in the window.
 * @param {string} message - Custom message for rate limit violations.
 */
const createLimiter = (windowMs, max, message = DEFAULT_MESSAGE) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      success: false,
      message,
      retryAfter: `${windowMs / 1000} seconds`,
    },
    headers: true, // Automatically sets `X-RateLimit-*` headers
    standardHeaders: true, // Includes rate limit info in `RateLimit-*` headers
    legacyHeaders: false, // Disables `X-RateLimit-*` headers (if unnecessary)
    limit: max,
  });
};

// Rate limiters
const rateLimiters = {
  // General configurations and logging
  configLimiter: createLimiter(ONE_HOUR, 3500),
  logLimiter: createLimiter(ONE_HOUR, 3500),

  // Specific actions
  createPostLimiter: createLimiter(5 * ONE_MINUTE, 20),
  likeSaveLimiter: createLimiter(10 * ONE_MINUTE, 250),
  followLimiter: createLimiter(10 * ONE_MINUTE, 100),
  signUpSignInLimiter: createLimiter(10 * ONE_MINUTE, 10),
  commentLimiter: createLimiter(5 * ONE_MINUTE, 100),
};

module.exports = rateLimiters;
