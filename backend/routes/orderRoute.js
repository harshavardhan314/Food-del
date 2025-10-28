const express=require('express');   
const authMiddleware=require('../middleware/authMiddleware');
const { placeOrder }=require('../controllers/ordercontroller');
const orderRouter=express.Router();

orderRouter.post('/placeorder',authMiddleware,placeOrder);

module.exports=orderRouter;