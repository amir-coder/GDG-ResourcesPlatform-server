
//requirement
const express=require('express');
const mongoose=require('mongoose');
const ressourcesDb=require('./models/db_ressources');
var ressourcesRoutes=require('./routes/ressources');
require('dotenv').config();

//global variable
const app=express();
const port=process.env.PORT;
const connectionUrl=process.env.CONNECTIONURL;

/*
if u dont have the .env file here is the port and url to test the API
PORT=4000
CONNECTIONURL=mongodb+srv://imadbourouche:KDL3BtUM7wZe6q@cluster0.agb2b.mongodb.net/RessourcesDb?retryWrites=true&w=majority
*/


//middelware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/ressources',ressourcesRoutes);


//main
app.get('/',function(req,res){
    res.status(200).send("HOME");
});

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