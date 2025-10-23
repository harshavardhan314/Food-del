

const express = require("express");
const router=express.Router();
const userController=require("../Controllers/usercontroller.js");
const user=require("../models/userModel.js");

router.post('/create-user',userController.createUser);
router.post('/login-user',userController.loginUser);

module.exports=router;