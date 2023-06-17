const Sequelize=require('sequelize')
const sequelize=require("../database");
const user=sequelize.define('users',
{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING
    },
    email:{
        type:Sequelize.STRING
    },
    password:{
        type:Sequelize.STRING
    },
    phone:{
        type:Sequelize.STRING
    }
})
module.exports=user;