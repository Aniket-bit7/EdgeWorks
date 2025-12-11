const rateLimit = require("express-rate-limit");

const globalLimiter = rateLimit({
  windowMs: 60 * 1000,         
  max: 30,                     
  message: {
    error: "Too many requests, please try again later."
  },
  standardHeaders: true,       
  legacyHeaders: false,        
});

module.exports = globalLimiter;
