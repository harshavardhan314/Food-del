const bcrypt = require("bcryptjs");
const validator = require("validator");
const userModel = require("../models/userModel.js");

// Signup Controller
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic input validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: `Missing required field: ${
          !name ? "name" : !email ? "email" : "password"
        }`,
      });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please enter a valid email address",
        });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "This email is already registered" });
    }

    // Validate password (single check)
    if (typeof password !== "string" || password.length < 6) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Password must be at least 6 characters long",
        });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (err) {
    console.error("Error in createUser:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = { createUser };

// Simple login stub to avoid undefined handler when route exists
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // checking the missing fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    return res.status(200).json({ success: true, message: "Login successful" });
  }
  
   catch (err) {
    console.error("Error in loginUser:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports.loginUser = loginUser;
