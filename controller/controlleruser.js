const bcrypt = require("bcrypt");
const sequelize = require("../database");
const USER = require("../models/user");
async function signUp(req, res) {
  try {
    const t = await sequelize.transaction();
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    const search = await USER.findOne({ where: { phone: phone } });
    const search2 = await USER.findOne({ where: { email: email } });

    if (search || search2) {
      res.status(501).json({ message: "Already a user" });
    } else if(!search && !search2){
      const saltrounds = 10;
      bcrypt.hash(password, saltrounds, async (err, hash) => {
        if (hash) {
          await USER.create(
            {
              name: name,
              password: hash,
              email: email,
              phone: phone,
            },
            { transaction: t }
          );
          await t.commit();
          res.status(200).json({ message: "Account created" });
        } else {
          console.log(err);
          res.status(500).json({ message: err });
        }
      });
    }
  } catch (err) {
    console.log(err);
    await t.rollback();
    res.status(500).json({ message: err });
  }
}
async function signIn(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const search = await USER.findOne({ where: { email: email } });
    if (search) {
      bcrypt.compare(password, search.password, (err, result) => {
        if (result) {
          res.status(200).json({ message: "logging in" });
        } else {
          console.log(err)
          res.status(501).json({ message: "Wrong Password" });
        }
      });
    } else {
      res.status(404).json({ message: "Account not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "err" });
  }
}
module.exports = { signUp, signIn };
