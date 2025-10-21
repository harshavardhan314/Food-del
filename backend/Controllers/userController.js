
const userModel = require("../models/userModel");

// Create a new user (signup)
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new userModel({ name, email, password, role });
    await newUser.save();

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
