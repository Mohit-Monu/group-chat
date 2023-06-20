const express=require('express')
const router=express.Router();
const controlleradmin=require('../controller/controlleradmin.js');
const authentication=require('../middlewere/userauthentication')

router.post("/admin/invitesearch",authentication.authenticationoftoken,controlleradmin.addviainput)
// router.get("/group/getsmss/:group_id",authentication.authenticationoftoken,controllergroupchat.loadmsg)
module.exports=router