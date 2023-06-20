const GROUPCHAT = require("../models/groupchat");
const GROUPS = require("../models/groups");

const {Op}=require("sequelize")
async function sendmess(req, res) {
  try {
    const message = req.body.message;
    await GROUPCHAT.create({
      massage: message,
      name: req.user.name,
      userId: req.user.id,
      groupid: req.body.group_id
    });
    res.status(200).json({ messages: "message sent" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
}
async function loadmsg(req,res) {
  const group_id=req.params.group_id
  try {
    const messages = await GROUPCHAT.findAll({where: {groupid:group_id}});
    res.status(200).json({ messages: messages,userId:req.user.id });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "something went wrong" });
  }
}
async function creategroup(req,res){
  try{
    await GROUPS.create({
      name:req.body.groupname,
      role:"Admin",
      userId:req.user.id,
      group_id:req.body.datenow
    })
    res.status(200).json({ messages: "group created successfully" });
  }catch(err){
    res.status(500).json({ message: "something went wrong" });
  }
}
async function getgroup(req,res){
  try{
    const data=await GROUPS.findAll({where:{userId:req.user.id}})
    res.status(200).json({data});
  }catch(err){
    console.log(err)
    res.status(500).json({ message: "something went wrong" });
  }
}
module.exports = { sendmess, loadmsg,creategroup,getgroup};
