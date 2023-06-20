const USER = require("../models/user");
const GROUPS = require("../models/groups");
async function addviainput(req, res) {
  try {
    const userdet = req.body.invitedetails;
    const search = await USER.findOne({ where: { phone: userdet } });
    const search2 = await USER.findOne({ where: { email: userdet } });
    if (!search && !search2) {
      res.status(404).json({ message: "already a user" });
    } else {
      if (!search) {
        try {
          const searching = await GROUPS.findAll({
            where: { userId: search2.id },
          });
          let flag=0;
          searching.forEach((element) => {
            if (element.group_id == req.body.group_id) {
            res.status(503).json({ message: "Already a user" });
              flag++
            }
          });
          if(flag==0){
            await GROUPS.create({
                name: req.body.group_name,
                role: "simple",
                userId: search2.id,
                group_id: req.body.group_id,
              });
              res.status(200).json({ data: search2 });
          }
        } catch (err) {
          res.status(500).json({ message: "something went wrong" });
        }
      } else {
        try {
          const searching = await GROUPS.findAll({
            where: { userId: search.id },
          });
          let flag=0;
          searching.forEach((element) => {
            if (element.group_id == req.body.group_id) {
              res.status(503).json({ message: "Already a user" });
              flag++
            }
          });
          if(flag==0){
            await GROUPS.create({
                name: req.body.group_name,
                role: "simple",
                userId: search.id,
                group_id: req.body.group_id,
              });
              res.status(200).json({ data: search });
          }
        } catch (err) {
          res.status(500).json({ message: "something went wrong" });
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
}
module.exports = { addviainput };
