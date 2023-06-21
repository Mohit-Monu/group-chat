const jwt = require("jsonwebtoken");
const GROUPS = require("../models/groups");
const USER = require("../models/user");
async function authenticationoftoken(req, res, next) {
  try {
    const token = req.header("token");
    const user = jwt.verify(token, process.env.TOKEN);
    const userdetail = await USER.findOne({ where: { id: user.userId } });
    req.user = userdetail;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something went wrong" });
  }
}
async function authenticationofadmin(req, res, next) {
  try {
    const token = req.header("token");
    const user = jwt.verify(token, process.env.TOKEN);
    const userdetail = await USER.findOne({ where: { id: user.userId } });
    if(userdetail){
      const userdetail2 = await GROUPS.findAll({where: { userId: userdetail.id }});
      userdetail2.forEach((element) => {
        if (element.group_id == req.body.group_id) {
          if (element.role == "Admin") {
            req.user = userdetail;
            req.group = element;
            next();
          }else{
            return res.status(402).json({ message: "You are not a admin" });
          }
        }
      });
    }else{
      return res.status(500).json({ message: "something went wrong" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something went wrong" });
  }
}
module.exports = { authenticationoftoken, authenticationofadmin };
