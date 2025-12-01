const jwt = require("jsonwebtoken");

module.exports = function requireAuth(req, res, next) {
  // console.log("AUTH CHECK START");
  // console.log("Authorization Header:", req.headers.authorization);

  if (!req.headers.authorization) {
    // console.log("NO AUTH HEADER");
    // console.log("Incoming Token:", req.headers.authorization);

    return res.status(401).json({ error: "Missing Authorization header" });
  }

  const token = req.headers.authorization.split(" ")[1];
  // console.log("Extracted Token:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    // console.log("✔ JWT DECODED:", decoded);

    req.user = decoded;
    // console.log("AUTH CHECK END (SUCCESS)");
    next();

  } catch (err) {
    // console.log("JWT VERIFY FAILED:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
