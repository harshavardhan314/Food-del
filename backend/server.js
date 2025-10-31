// Load environment variables
const dotenv = require("dotenv");
dotenv.config(); // Must come before other imports using env vars

// Import dependencies
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

// Import routes
const userRoute = require("./routes/userRoute");
const cartRoute = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoute");
const foodRoute = require("./routes/foodRoute"); // Add this if you have a food route
const adminRoutes = require("./routes/adminRoute");
// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// --- Middlewares ---
app.use(express.json());

// CORS setup
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend (Vite/React)
    credentials: true,
  })
);

// Static file serving (for images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- Database Connection ---
mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// --- Routes ---
app.get("/", (req, res) => res.send("🍔 API is running..."));
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/food", foodRoute); 
app.use("/api/admin", adminRoutes);

// --- 404 Fallback ---
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// --- Start Server ---
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
