
const User = require("../model/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'fuhè_yhèoué"hezjhgçèàhjzhç_puhrjgnçpj[#`|~`ihàjoim~#|[{\||[#{|[#['

module.exports.getInfo = async (req , res) => {
    const {token } = req.body
    try {
        const user = jwt.verify(token, JWT_SECRET)
        const _id = user.id
        // const fullName = newFullName
        // const discordId = newDiscordId
        const userubdate = await User.findById(_id);
        res.send({status : "ok" , values : {
             username : userubdate.username ,
             email : userubdate.email ,
             fullName : userubdate.fullName ,
              discordId : userubdate.discordId}
             })
    }
    catch(e) {
        res.send({status : "error"})
    }
}

module.exports.editProfile = async (req, res) => {
    const {token,username ,  fullName, discordId, email, } = req.body
    console.log(username ,fullName ,)

    try {
        const user = jwt.verify(token, JWT_SECRET)
        const _id = user.id
        // const fullName = newFullName
        // const discordId = newDiscordId
        const userubdate = await User.findById(_id);
        userubdate.fullName =  fullName ? fullName : userubdate.fullName ;
        userubdate.discordId = discordId ? discordId : userubdate.discordId ;
        userubdate.email = email ? email : userubdate.email ;
        userubdate.username = username ? username : userubdate.username ;
        console.log(userubdate)
        await userubdate.save();
        res.json({ status: 'ok' })
    } catch (error) {
        res.json({ status: 'error', error: error })
    }

}

module.exports.changePassword =  async (req, res) => {
    const {  newpassword: plainTextPassword  } = req.body
    const token = req.cookies.token

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

}

module.exports.login  =  async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email }).lean()

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
        return res.json({ status: 'ok',token : token});//res.json({ status: 'ok', data: token })
    }

    res.json({ status: 'error', error: 'Invalid username/password' })
}

module.exports.register = async (req, res) => {
    const { username, email, fullName, discordId, password: plainTextPassword } = req.body

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
            email,
            password,
            fullName,
            discordId,
            
        })
        const token = jwt.sign(
            { 
            id: response._id, 
            username: response.username 
            }, 
            JWT_SECRET
        )
        res.cookie('token',token);
        res.json({ status: 'ok'  ,token})
    } catch (error) {
        if(error.code === 11000) {

            return res.json({ status: 'error', error: 'Username already in use' })
        }
        throw error
    }



}