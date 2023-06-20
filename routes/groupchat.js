const express=require('express')
const router=express.Router();
const controllergroupchat=require('../controller/controllergroupchat');
const authentication=require('../middlewere/userauthentication')

router.post("/group/sendmess",authentication.authenticationoftoken,controllergroupchat.sendmess)
router.get("/group/getsmss/:group_id",authentication.authenticationoftoken,controllergroupchat.loadmsg)
router.post("/group/creategroup",authentication.authenticationoftoken,controllergroupchat.creategroup)
router.get("/group/getgroup",authentication.authenticationoftoken,controllergroupchat.getgroup)


module.exports=router