const ressourcesDb=require('../models/db_ressources');
const mongoose=require('mongoose');

//get all ressources from db
//admin + user
module.exports.getAllRessources= async (req,res)=>{
    try{
        const allRessources= await ressourcesDb.find();
        console.log('LOGS: Getting all ressources');
        res.status(200).send(allRessources);
    }catch(err){
        console.log("Getting all ressources failed"+err);
        res.status(500).send("Error");
    }
}

//get one of the ressources by it's id
//amdin + user
module.exports.getRessourceById= async (req,res)=>{
    try{
        const oneRessource = await ressourcesDb.findById(req.params.id_ressource);
        if(oneRessource){
            res.status(200).send(oneRessource);
        }else{
            res.status(404).send("Not found");
        }
        console.log(`LOGS: Getting ressource with id = ${req.params.id_ressource}`);
    }catch(err){
        console.log("Getting the record with id failed"+err);
        res.status(500).send("Error");
    }
}




//adding ressource
//admin + user
module.exports.addRessource=async(req,res,next)=>{
    try{
        req.body.owner=mongoose.Types.ObjectId(req.decodedToken.id);
        await ressourcesDb.create(req.body);
        console.log("LOGS: Adding ressource");
        res.status(200).send("SUCCESS: Creation succeeded");
    }catch(err){
        console.log("creation failed "+err.message);
        res.status(500).send("Error");
    }
}

//delete a ressource
//admin
module.exports.deleteRessource=async(req,res)=>{
    try{
        const ressourceToDelete=await ressourcesDb.findById(req.params.id_ressource);
        if(ressourceToDelete){
            await ressourcesDb.deleteOne({_id:req.params.id_ressource});
            console.log(`LOGS: suppression succeded of article with id= ${req.params.id_ressource}`);
            res.status(200).send("SUCCESS: suppression succeded of ressource");
        }else{
            res.status(401).send("Ressources not found");
        }
    }catch(err){
        console.log("suppression failed\n"+err);
        res.status(500).send("Error");
    }
}



//validate the ressource
// admin
module.exports.validateRessource=async(req,res)=>{
    try{
        const ressourceToValidate=await ressourcesDb.findById(req.params.id_ressource);
        if(ressourceToValidate){
            if(ressourceToValidate.isvalid){
                res.status(200).send("Already updated");
            }else{
                await ressourcesDb.updateOne({_id:req.params.id_ressource},{isvalid: true});
                console.log(`LOGS: validation succeded of article with id= ${req.params.id_ressource}`);
                res.status(200).send("SUCCESS: validation successded for the ressource");
            }
        }else{
            res.status(404).send("Ressources not found");
        }
    }catch(err){
        console.log("Updating failed\n"+err);
        res.status(500).send("Validation failed");
    }
}