const jwt = require("jsonwebtoken");
const USER = require("../models/user");
async function authenticationoftoken(req, res, next) {
  try {
    const token = req.header("token");
    const user = jwt.verify(token, process.env.TOKEN);
    const userdetail = await USER.findOne({ where: { id: user.userId } });
    req.user = userdetail;
    next();
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "something went wrong" });
  }
}
module.exports = { authenticationoftoken };
