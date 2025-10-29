const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    if (!userId)
      return res.json({ success: false, message: "User ID missing" });

    // Create new order
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
    });

    await newOrder.save();

    // Clear user's cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Prepare Stripe line items
    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // Add delivery charge
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 200,
      },
      quantity: 1,
    });

    // Create Stripe session
    const frontend_url = "http://localhost:5173";
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });
    console.log("Hi Ikkade Error Vastudnhii");

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Stripe Order Error:", error);
    res.json({ success: false, message: "Error creating Stripe session" });
  }
};

// Payment verification
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  console.log(orderId);
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment successful" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.error("Verify error:", error);
    res.json({ success: false, message: "Verification failed" });
  }
};



const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.user.id }); // ✅ Use req.user.id
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};




module.exports = { placeOrder, verifyOrder ,userOrders};
