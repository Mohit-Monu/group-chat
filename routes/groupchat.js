const express=require('express')
const router=express.Router();
const controllergroupchat=require('../controller/controllergroupchat');
const authentication=require('../middlewere/userauthentication')

router.post("/group/sendmess",authentication.authenticationoftoken,controllergroupchat.sendmess)

module.exports=router