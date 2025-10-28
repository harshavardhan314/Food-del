const express = require("express");
const { addToCart, removeFromCart, getCart } = require("../controllers/cartcontroller");
const middleware = require("../middleware/authMiddleware");

const cartRouter = express.Router();

cartRouter.post("/add", middleware, addToCart);
cartRouter.post("/remove", middleware, removeFromCart);
cartRouter.get("/get", middleware, getCart);

module.exports = cartRouter;
