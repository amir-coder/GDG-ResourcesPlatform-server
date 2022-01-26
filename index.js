const express = require("express");
const path = require('path');
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose');
const User = require('./model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'fuhè_yhèoué"hezjhgçèàhjzhç_puhrjgnçpj[#`|~`ihàjoim~#|[{\||[#{|[#['

mongoose.connect('mongodb+srv://AmineTech:AmineTech123@cluster0.a222q.mongodb.net/GDG-CodeIt?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedtopology: true,
    //useCreateIndex: true
})
const app = express();
app.use('/', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json()) //decode the body if it is json

app.post('/api/user-profile', async (req, res) => {
    const { token, newFullName: fullName, newDiscordId: discordId, } = req.body

    try {
        const user = jwt.verify(token, JWT_SECRET)
        const _id = user.id
        // const fullName = newFullName
        // const discordId = newDiscordId
        await User.updateOne(
            { _id }, 
            { $set: { fullName },  $set: { discordId }  },
        )
        res.json({ status: 'ok' })
    } catch (error) {
        res.json({ status: 'error', error: ';);););););)' })
    }

})

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

app.post('/api/login', async (req, res) => {
    //prendre les données rentrée par le user
    const { /*username,*/ email, password } = req.body

    //trouver le user qui match avec les données tapée par le user
    const user = await User.findOne({ /*username,*/ email }).lean()

    //Si le user n'est pas bon afficher cette erreur
    if(!user) {
        return res.json({ status: 'error', error: 'Invalid username, email or password'})
    }

    //si le password hashed est juste
    if(await bcrypt.compare(password, user.password)) {

        const token = jwt.sign(
            { 
            id: user._id, 
            //username: user.username,
            email: user.email,
            }, 
            JWT_SECRET
        )

        return res.json({ status: 'ok', data: token })
    }

    //si le password n'est pas bon alors afficher cette errur
    res.json({ status: 'error', error: 'Invalid username, email or password' })
})

app.post('/api/register', async (req, res) => {
    //prendre les datas du front-end
    const { username, email, fullName, discordId, password: plainTextPassword } = req.body


    //Verification of what the user type
    if (!username || typeof username !== 'string') {
        return res.json({ status: 'error', error: 'Invalid username' })
    }

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Invalid password' })
    }

    if (plainTextPassword.length < 5) {
        return res.json({ status: 'error', error: 'Password too small. should be atleast 6 characters' })
    }

    //Hashing the password
    const password = await bcrypt.hash(plainTextPassword, 10)

    //console.log(await bcrypt.hash(password, 10))

    try {
        const response = await User.create({
            username,
            email,
            password,
            fullName,
            discordId,
            
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

app.listen(4000 , ()=> {
    console.log("server at post 4000")
})