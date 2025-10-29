const express = require("express");
const router = express.Router();
const middleware = require("../middleware/authMiddleware");
const { placeOrder, verifyOrder, userOrders } = require("../controllers/ordercontroller");

router.post("/place", placeOrder);
router.post("/verify", verifyOrder);
router.get("/userorders", middleware, userOrders); 

module.exports = router;
