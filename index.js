
//requirement
var ressourcesRoutes=require('./routes/ressources');
var userRouter = require("./routes/user")
require('dotenv').config();
const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//global variable
const port=process.env.PORT || 4000;
const connectionUrl=process.env.CONNECTIONURL || "mongodb://localhost:27017/GDG_Ressorce_Server";

//middelware
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json()) //decode the body if it is json
app.use('/ressources',ressourcesRoutes);
app.use("/user",userRouter)

//running the app
app.listen(port,()=>{
    console.log(`server runnig in http://127.0.0.1:${port}`);
    //connect to mongodb
    db=mongoose.connect(connectionUrl,{useUnifiedTopology : true , useNewUrlParser : true});
    mongoose.connection.once('open',function(){
        console.log('connection established with mongodb');
    }).on('error',function(error){
      console.log('error: ',error);
    })
})

