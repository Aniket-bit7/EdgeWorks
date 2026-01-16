const express = require("express");
const bcrypt = require("bcrypt");
const prisma = require("../prismaClient.js");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt.js");
const requireAuth = require("../middleware/requireAuth.js");

const router = express.Router();


const isEmptyOrWhitespace = (value) =>
  !value || value.trim().length === 0;

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


router.post("/signup", async (req, res) => {
  try {
    let { email, password, firstName, lastName } = req.body;

    email = email?.trim();
    password = password?.trim();
    firstName = firstName?.trim();
    lastName = lastName?.trim();

    if (
      isEmptyOrWhitespace(email) ||
      isEmptyOrWhitespace(password) ||
      isEmptyOrWhitespace(firstName) ||
      isEmptyOrWhitespace(lastName)
    ) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: "Invalid email format",
      });
    }

    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return res.status(400).json({
        error: "Email already registered",
      });
    }

    const hashed = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        firstName,
        lastName,
        plan: "free",
      },
    });

    const fullName = `${user.firstName} ${user.lastName}`;

    const accessToken = signAccessToken({
      sub: user.id,
      email: user.email,
      plan: user.plan,
    });

    const refreshToken = signRefreshToken({
      sub: user.id,
      email: user.email,
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    res.json({
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        firstName,
        lastName,
        fullName,
        plan: user.plan,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: "Signup failed",
      details: err.message,
    });
  }
});


router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email?.trim();
    password = password?.trim();

    if (
      isEmptyOrWhitespace(email) ||
      isEmptyOrWhitespace(password)
    ) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: "Invalid email format",
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(400).json({
        error: "Invalid password",
      });
    }

    const fullName = `${user.firstName} ${user.lastName}`;

    const accessToken = signAccessToken({
      sub: user.id,
      email: user.email,
      plan: user.plan,
    });

    const refreshToken = signRefreshToken({
      sub: user.id,
      email: user.email,
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    res.json({
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName,
        plan: user.plan,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: "Login failed",
    });
  }
});


router.post("/refresh", async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({
        error: "Missing refresh token",
      });
    }

    const payload = verifyRefreshToken(token);

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user || user.refreshToken !== token) {
      return res.status(403).json({
        error: "Refresh token invalid",
      });
    }

    const newAccessToken = signAccessToken({
      sub: user.id,
      email: user.email,
      plan: user.plan,
    });

    const newRefreshToken = signRefreshToken({
      sub: user.id,
      email: user.email,
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("Refresh error:", err.message);
    res.status(401).json({
      error: "Invalid or expired refresh token",
    });
  }
});

router.post("/upgrade", requireAuth, async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.user.sub },
      data: { plan: "pro" },
    });

    const newAccessToken = signAccessToken({
      sub: user.id,
      email: user.email,
      plan: user.plan,
    });

    res.json({ accessToken: newAccessToken, user });
  } catch (err) {
    res.status(500).json({
      error: "Failed to upgrade plan",
    });
  }
});

module.exports = router;
