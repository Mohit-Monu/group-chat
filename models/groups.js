const Sequelize = require("sequelize");
const sequelize = require("../database");
const groups = sequelize.define("groups", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  role: {
    type: Sequelize.STRING,
  },
  group_id:{
    type: Sequelize.STRING,
  },
  memberName:{
    type: Sequelize.STRING,
  }
})
module.exports = groups;
