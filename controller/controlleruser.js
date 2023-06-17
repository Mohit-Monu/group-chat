const sequelize = require("../database");
const USER = require("../models/user");
async function signUp(req, res) {
  try {
    const t=await sequelize.transaction()
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    const search = await USER.findOne({ where: { phone: phone } });
    if (search) {
      res.status(501).json({ message: "Already a user" });
    } else {
      await USER.create(
        {
          name: name,
          password: password,
          email: email,
          phone: phone,
        },
        { transaction: t }
      );
      await t.commit()
      res.status(200).json({ message: "Account created" });
    }
  } catch (err) {
    console.log(err);
    await t.rollback()
    res.status(500).json({ message: err });
  }
}
async function signIn(req,res){
    try{
        const email=req.body.email
        const password=req.body.password
        console.log(email,password)
        const search=await USER.findOne({where:{email:email}})
        if(search){
            if(search.password==password){
                res.status(200).json({message:"logging in"})
            }else{
            res.status(501).json({message:"Wrong Password"})
            }
        }else{
            res.status(404).json({message:"Account not found"})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({message:'err'})
    }
}
module.exports = { signUp,signIn };
