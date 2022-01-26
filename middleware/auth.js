const jwt=require('jsonwebtoken');
const users=require('../model/user');
const mongoose=require('mongoose');

const JWT_SECRET = 'fuhè_yhèoué"hezjhgçèàhjzhç_puhrjgnçpj[#`|~`ihàjoim~#|[{\||[#{|[#['

//check if the user is logged or not
module.exports.isLogged=(req,res,next)=>{
    const token=req.cookies.token;
    if(token){
        try{
            const decodedToken=jwt.verify(token,JWT_SECRET);
            req.decodedToken=decodedToken;
            console.log('LOGS: user is logged in');
            next();
        }catch(err){
            res.status(500).send('you have to login');
        }
    }else{
        res.status(500).send('you have to login');
    }
}


//just for admins
module.exports.isAuthenticated=async(req,res,next)=>{
    try{
        const decodedToken=req.decodedToken;
        if(decodedToken){
            const userId=decodedToken.id;
            const user=await users.findOne({_id:userId});
            if(!user.isAdmin){
                res.status(403).send("not allowd");
            }else{
                console.log("Authentication successeded");
                next();
            }
        }
    }catch(err){
        console.log(err);
        res.status(500).send('Authentication failed');
    }
}