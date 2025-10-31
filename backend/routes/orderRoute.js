const express = require("express");
const router = express.Router();
const middleware = require("../middleware/authMiddleware");
const { placeOrder, verifyOrder, userOrders, allOrders } = require("../controllers/ordercontroller");

router.post("/place", placeOrder);
router.post("/verify", verifyOrder);
router.get("/userorders", middleware, userOrders); 
router.get("/allOrders",allOrders);
module.exports = router;
