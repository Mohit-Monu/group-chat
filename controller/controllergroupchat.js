const GROUPCHAT=require("../models/groupchat")
async function sendmess(req,res){
    try{
        const message=req.body.message
        await GROUPCHAT.create({
            massage:message,
            name:req.user.name,
            userId:req.user.id
        })
    }catch(err){
        console.log(err)
     res.status(500).json({ message: "something went wrong" });
    }
}
module.exports={sendmess}