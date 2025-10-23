const bcrypt = require("bcryptjs");
const validator = require("validator");
const userModel = require("../models/userModel.js");

// Signup Controller
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic input validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ 
          success: false, 
          message: `Missing required field: ${!name ? 'name' : !email ? 'email' : 'password'}`
        });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email address" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "This email is already registered" });
    }

    // Validate password
    if (password.length < 6) {
      return res
        .status(400)
        .json({ success: false, message: "Password must be at least 6 characters long" });
    }

    // Validate strong password
    if (!validator.isStrongPassword(password, { minLength: 8 })) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long and strong",
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
