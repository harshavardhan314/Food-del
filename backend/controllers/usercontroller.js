const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");

// safe token creation with fallback secret
const createToken = (id) => {
  const secret = process.env.JWT_SECRET || "dev-secret";
  try {
    return jwt.sign({ id }, secret, { expiresIn: "7d" });
  } catch (err) {
    console.error("JWT sign error:", err);
    throw err;
  }
};

// sanitize helper
const sanitizeEmail = (email) =>
  typeof email === "string" ? email.toLowerCase().trim() : email;

// login user
const loginUser = async (req, res) => {
  try {
    let {email, password } = req.body || {};
    email = sanitizeEmail(email);

    if ( !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      console.log("Login failed: user not found for", email);
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Login failed: password mismatch for", email);
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = createToken(user._id);
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// register user
const registerUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    console.log("Registering user:", { name, email });

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    // check existence (case-insensitive handled by schema but keep check)
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    if (typeof password !== "string" || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();
    const token = createToken(user._id);
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = { loginUser, registerUser };
