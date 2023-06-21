const express=require('express')
const router=express.Router();
const controlleradmin=require('../controller/controlleradmin.js');
const authentication=require('../middlewere/userauthentication')

router.post("/admin/invitesearch",authentication.authenticationofadmin,controlleradmin.addviainput)
router.post("/admin",authentication.authenticationofadmin,controlleradmin.verifyadmin)
router.post("/admin/promote",authentication.authenticationofadmin,controlleradmin.promote)
router.post("/admin/kick",authentication.authenticationofadmin,controlleradmin.kick)

module.exports=router