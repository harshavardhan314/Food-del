const userModel = require("../models/userModel.js");

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = new userModel({
      name,
      email,
      password,
    });
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    console.log("Error creating user:", err);
    res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
};

module.exports = { createUser };
