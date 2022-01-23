const ressourcesDb=require('../models/db_ressources');
const verificatioin=require('./verification');


//get all ressources from db
//admin + user
module.exports.getAllRessources= async (req,res)=>{
    try{
        const allRessources= await ressourcesDb.find();
        console.log('LOGS: Getting all ressources');
        res.status(200).send(allRessources);
    }catch(err){
        console.log("Getting all ressources failed"+err);
        res.status(500).send(err);
    }
}

//get one of the ressources by it's id
//amdin + user
module.exports.getRessourceById= async (req,res)=>{
    try{
        const oneRessource = await ressourcesDb.findById(req.params.id_ressource);
        console.log(`LOGS: Getting ressource with id = ${req.params.id_ressource}`);
        res.status(200).send(oneRessource);
    }catch(err){
        console.log("Getting the record with id failed"+err);
        res.status(500).send(err);
    }
}




//adding ressource
//admin + user
module.exports.addRessource=async(req,res,next)=>{
    try{

        await verificatioin.verifieRessource(req);
        console.log("LOGS: Verification successeded");
        await ressourcesDb.create(req.body);
        console.log("LOGS: Adding ressource");
        res.status(201).send("SUCCESS: Creation succeeded still the validation from the admin");
    }catch(err){
        console.log("creation failed "+err.message);
        res.status(500).send(err);
    }
}

//delete a ressource
//admin
module.exports.deleteRessource=async(req,res)=>{
    try{
        await ressourcesDb.findByIdAndDelete(req.params.id_ressource);
        console.log(`LOGS: suppression succeded of article with id= ${req.params.id_ressource}`);
        res.status(205).send("SUCCESS: suppression succeded of article");
    }catch(err){
        console.log("suppression failed\n"+err);
        res.status(500).send(err);
    }
}



//validate the ressource
// admin
module.exports.validateRessource=async(req,res)=>{
    try{
        await ressourcesDb.findByIdAndUpdate(req.params.id_ressource,{isvalid: true});
        console.log(`LOGS: validation succeded of article with id= ${req.params.id_ressource}`);
        res.status(200).send("SUCCESS: validation successded for the ressource");
    }catch(err){
        console.log("Updating failed\n"+err);
        res.status(500).send("Updating failed");
    }
}