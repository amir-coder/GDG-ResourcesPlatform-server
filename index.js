
//requirement
var ressourcesRoutes=require('./routes/ressources');
require('dotenv').config();
const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//global variable

const port=process.env.PORT;
const connectionUrl=process.env.CONNECTIONURL;
const JWT_SECRET = 'fuhè_yhèoué"hezjhgçèàhjzhç_puhrjgnçpj[#`|~`ihàjoim~#|[{\||[#{|[#['

/*
mongoose.connect('mongodb+srv://AmineTech:AmineTech123@cluster0.a222q.mongodb.net/GDG-CodeIt?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedtopology: true,
    //useCreateIndex: true
})*/

//middelware
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/ressources',ressourcesRoutes);
app.use(bodyParser.json()) //decode the body if it is json


//routes
app.use('/', express.static(path.join(__dirname, 'static')));

//change password
app.post('/api/change-password', async (req, res) => {
    const { token, newpassword: plainTextPassword  } = req.body

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Invalid password' })
    }

    if (plainTextPassword.length < 5) {
        return res.json({ status: 'error', error: 'Password too small. should be atleast 6 characters' })
    }

    try {
        const user = jwt.verify(token, JWT_SECRET)
        const _id = user.id
        const password = await bcrypt.hash(plainTextPassword, 10)
        await User.updateOne(
            { _id }, 
            {
                $set: { password }
            }
        )
        res.json({ status: 'ok' })
    } catch (error) {
        res.json({ status: 'error', error: ';);););););)' })
    }

})



app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname, '/static/login.html'));
})
//login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username }).lean()

    if(!user) {
        return res.json({ status: 'error', error: 'Invalid username/password'})
    }

    if(await bcrypt.compare(password, user.password)) {

        const token = jwt.sign(
            { 
            id: user._id, 
            username: user.username 
            }, 
            JWT_SECRET
        )
        //add the token to the cookies
        res.cookie('token',token);
        return res.json({ status: 'ok'});//res.json({ status: 'ok', data: token })
    }

    res.json({ status: 'error', error: 'Invalid username/password' })
})

//registeration
app.post('/api/register', async (req, res) => {
    const { username, password: plainTextPassword } = req.body

    if (!username || typeof username !== 'string') {
        return res.json({ status: 'error', error: 'Invalid username' })
    }

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Invalid password' })
    }

    if (plainTextPassword.length < 5) {
        return res.json({ status: 'error', error: 'Password too small. should be atleast 6 characters' })
    }

    const password = await bcrypt.hash(plainTextPassword, 10)

    //console.log(await bcrypt.hash(password, 10))

    try {
        const response = await User.create({
            username,
            password
        })
        console.log('USER CREATED SUCCESS',response)
    } catch (error) {
        if(error.code === 11000) {

            return res.json({ status: 'error', error: 'Username already in use' })
        }
        throw error
    }

    res.json({ status: 'ok' })
})




/*
if u dont have the .env file here is the port and url to test the API
PORT=4000
CONNECTIONURL=mongodb+srv://imadbourouche:KDL3BtUM7wZe6q@cluster0.agb2b.mongodb.net/RessourcesDb?retryWrites=true&w=majority
*/

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