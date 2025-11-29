const express = require("express");
const bcrypt = require("bcrypt");
const prisma = require("../prismaClient.js");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt.js");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    // 1. Validate strong password
    const strongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!strongPassword.test(password)) {
      return res.status(400).json({
        error:
          "Password must be 8+ characters and include uppercase, lowercase, number, and special character.",
      });
    }

    // 2. Check if email is already registered
    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // 3. Hash password
    const hashed = await bcrypt.hash(password, 12);

    // 4. Create user in database
    const user = await prisma.user.create({
      data: { email, password: hashed, firstName, lastName },
    });

    // 5. Create access + refresh tokens
    const accessToken = signAccessToken({ sub: user.id, email });
    const refreshToken = signRefreshToken({ sub: user.id, email });

    // 6. Save refresh token in DB
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    // 7. Set refresh token cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    // 8. Send response
    res.json({ accessToken, user });

  } catch (err) {
    res.status(500).json({ error: "Signup failed", details: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: "User not found" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: "Invalid password" });

    const accessToken = signAccessToken({ sub: user.id, email });
    const refreshToken = signRefreshToken({ sub: user.id, email });

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    res.json({ accessToken, user });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

router.post("/refresh", async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ error: "Missing token" });

  try {
    const payload = verifyRefreshToken(token);

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user || user.refreshToken !== token)
      return res.status(400).json({ error: "Invalid token" });

    const newAccess = signAccessToken({ sub: user.id, email: user.email });
    const newRefresh = signRefreshToken({ sub: user.id, email: user.email });

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefresh },
    });

    res.cookie("refreshToken", newRefresh, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    res.json({ accessToken: newAccess });
  } catch (err) {
    res.status(401).json({ error: "Invalid refresh token" });
  }
});

module.exports = router;
