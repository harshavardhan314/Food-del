const userModel = require("../models/userModel");

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // from middleware
    const { itemId } = req.body;

    const user = await userModel.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    const cartData = user.cartData || {};
    cartData[itemId] = (cartData[itemId] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.error("Add to Cart Error:", error);
    res.json({ success: false, message: "Error adding to cart", error: error.message });
  }
};


const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.body;

    const user = await userModel.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    const cartData = user.cartData || {};

    if (cartData[itemId] && cartData[itemId] > 1) {
      cartData[itemId] -= 1;
    } else {
      delete cartData[itemId]; // remove item if quantity = 1
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Removed from Cart" });
  } catch (error) {
    console.error("Remove from Cart Error:", error);
    res.json({ success: false, message: "Error removing from cart", error: error.message });
  }
};


const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);

    if (!user) return res.json({ success: false, message: "User not found" });

    res.json({ success: true, cartData: user.cartData || {} });
  } catch (error) {
    console.error("Get Cart Error:", error);
    res.json({ success: false, message: "Error fetching cart", error: error.message });
  }
};

module.exports = { addToCart, removeFromCart, getCart };
