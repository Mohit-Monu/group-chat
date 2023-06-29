const Sequelize=require("sequelize");
const sequelize=require('../database');
const groupchat=sequelize.define("ArchivedChat",
{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    groupid:{
        type:Sequelize.STRING
    },
    massage:{
        type:Sequelize.STRING(5000)
    },
    name:{
        type:Sequelize.STRING
    },
    userId:{
        type:Sequelize.INTEGER,
    },
    type:{
        type:Sequelize.STRING
    }
}
)
module.exports=groupchat