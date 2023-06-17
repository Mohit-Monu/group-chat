require('dotenv').config()
const express=require('express');
const bodyparser=require('body-parser')
const cors=require('cors')

const sequelize=require('./database')
const userRoutes=require('./routes/user')


const app=express();

app.use(cors())
app.use(bodyparser.json())

app.use(userRoutes);
sequelize.sync()
.then(
    app.listen(process.env.PORT)
).catch((err)=>{
    console.log(err)
})