const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// ✅ Hardcoded admin credentials (can be moved to .env later)
const ADMIN_EMAIL = "admin@tomato.com";
const ADMIN_PASSWORD = "123456";

// POST /api/admin/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign(
      { email, role: "admin" },
      "secret_admin_key", // use process.env.JWT_SECRET in production
      { expiresIn: "1h" }
    );

    return res.json({
      success: true,
      message: "Admin login successful",
      token,
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid admin credentials",
    });
  }
});

module.exports = router;
