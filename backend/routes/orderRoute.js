const express = require("express");
const router = express.Router();
const { placeOrder, verifyOrder } = require("../controllers/orderController");

router.post("/place", placeOrder);
router.post("/verify", verifyOrder);

module.exports = router;
