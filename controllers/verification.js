
//the values of level
const LEVEL={
    Easy:'Easy',
    Meduim:"Meduim",
    Hard:"Hard"
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
module.exports.verifieRessource=(req)=>{
    if(!Object.keys(LEVEL).includes(req.body.level)) throw {type:"VerfificationError",message:'ERROR: level is invalid, EXPECTED: Easy OR Meduim OR Hard'};
    if(!Object.keys(TYPE_RESSOURCES).includes(req.body.type_ressource)) throw {type:"VerfificationError" ,message:'ERROR: type ressource invalid, EXPECTED: Video OR Documentation'};
    if(!isurl(req.body.link)) throw {type:"VerfificationError", message:'ERROR: invalid url'};
}
