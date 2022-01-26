const res = require("express/lib/response");
const users=require('../model/user');
//the values of level
const LEVEL={
  Beginner:'Beginner',
  Intermediate:"Intermediate",
  Advanced:"Advanced"
}

//the values of type ressrouces
const TYPE_RESSOURCES={
    Video:'Video',
    Documentation:'Documentation'
}

//function to check if the url is valid
function isurl(url){
    try{
      new URL(url);
    }catch(err){
      return false;
    };
    return true;
}

//function to perfom checks
module.exports.verifieRessource=async(req,res,next)=>{
  try{
    const decodedToken=req.decodedToken;
    if(decodedToken){
      if(!Object.keys(LEVEL).includes(req.body.level)) throw {type:"VerfificationError",message:'ERROR: level is invalid, EXPECTED: Beginner OR Intermediate OR Advanced'};
      if(!Object.keys(TYPE_RESSOURCES).includes(req.body.type_ressource)) throw {type:"VerfificationError" ,message:'ERROR: type ressource invalid, EXPECTED: Video OR Documentation'};
      if(!isurl(req.body.link)) throw {type:"VerfificationError", message:'ERROR: invalid url'};
      const userId=decodedToken.id;
      const user=await users.findOne({_id:userId});
      if(!user.isAdmin){
        if(req.body.vote){
            req.body.vote=0;
        }
        if(req.body.isvalid){
            req.body.isvalid=false;
        }
      }
      console.log("LOGS: Verification successeded");
      next();
    }
  }catch(err){
    res.status(500).send(err);
  }
}
