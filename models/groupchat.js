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
        type:Sequelize.STRING(5000)
    },
    name:{
        type:Sequelize.STRING
    }
}
)
module.exports=groupchat