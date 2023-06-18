const express=require('express')
const router=express.Router();
const controllergroupchat=require('../controller/controllergroupchat');
const authentication=require('../middlewere/userauthentication')

router.post("/group/sendmess",authentication.authenticationoftoken,controllergroupchat.sendmess)
router.get("/group/getsmss",authentication.authenticationoftoken,controllergroupchat.loadmsg)

module.exports=router