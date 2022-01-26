
const User = require("../model/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'fuhè_yhèoué"hezjhgçèàhjzhç_puhrjgnçpj[#`|~`ihàjoim~#|[{\||[#{|[#['


module.exports.changePassword =  async (req, res) => {
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

}

module.exports.login  =  async (req, res) => {
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
        return res.json({ status: 'ok',token : token});//res.json({ status: 'ok', data: token })
    }

    res.json({ status: 'error', error: 'Invalid username/password' })
}

module.exports.register = async (req, res) => {
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