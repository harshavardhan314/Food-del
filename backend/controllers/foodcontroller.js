const foodModel = require("../models/foodModel");

const addFood = async (req, res) => {
  try {
    // if no file uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    const { name, description, price, category } = req.body;
    const image_filename = req.file.filename;

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newFood = new foodModel({
      name,
      description,
      price,
      category,
      image: image_filename,
    });

    await newFood.save();

    res.status(201).json({
      success: true,
      message: "Food item added successfully",
      data: newFood,
    });
  } catch (error) {
    console.error("Error adding food:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const removeFood = async (req, res) => {
  try {
    const { id } = req.body;
    await foodModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Food deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { addFood, listFood, removeFood };
