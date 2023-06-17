const express=require('express');
const usercontroller=require("../controller/controlleruser");

const router=express.Router();
router.post('/user/sign_up',usercontroller.signUp);
router.post('/user/sign_in',usercontroller.signIn);

module.exports=router