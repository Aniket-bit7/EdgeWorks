const rateLimit = require("express-rate-limit");

const aiRateLimiter = rateLimit({
  windowMs: 60 * 1000,  
  max: 5,               
  message: {
    error: "AI usage limit reached. Please wait a moment before retrying."
  }
});

module.exports = aiRateLimiter;
