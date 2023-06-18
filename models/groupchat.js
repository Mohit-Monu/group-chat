const Sequelize=require("sequelize");
const sequelize=require('../database');
const groupchat=sequelize.define("groupchat",
{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    massage:{
        type:Sequelize.STRING
    },
    name:{
        type:Sequelize.STRING
    }
}
)
module.exports=groupchat