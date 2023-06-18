require('dotenv').config()
const express=require('express');
const bodyparser=require('body-parser')
const cors=require('cors')

const sequelize=require('./database')

const userRoutes=require('./routes/user')
const groupchatRoutes=require("./routes/groupchat")

const USER=require('./models/user')
const GROUPCHAT=require('./models/groupchat')

const app=express();

app.use(cors({
    origin:'http://127.0.0.1:5500',
    // credentials:true
}))
app.use(bodyparser.json())

app.use(userRoutes);
app.use(groupchatRoutes)

USER.hasMany(GROUPCHAT);
GROUPCHAT.belongsTo(USER)

sequelize.sync(
    // {force:true}
)
.then(
    app.listen(process.env.PORT)
).catch((err)=>{
    console.log(err)
})