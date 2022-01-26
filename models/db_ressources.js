const { type } = require('express/lib/response');
const mongoose=require('mongoose');


//schema
const ressourcesSchema=mongoose.Schema({
    categorie:{
        type: String,
        required : [true , 'please choose a categorie']
    },
    title:{
        type: String,
        required : [true , 'please Enter a title of the ressource']
    },
    level:{
        type: String,
        required : [true , 'please Enter a choose the level of this ressource']
    },
    type_ressource:{
        type: String,
        required : [true , 'please choose the type of the ressource']
    },
    owner:{
        type:mongoose.Types.ObjectId
    },
    description:String,
    link:{
        type:String
    },
    //dont send it with the request
    isvalid:{
        type: Boolean,
        default: false,
    },
    vote:{
        type:Number,
        default:0
    }
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports=mongoose.model('Ressources',ressourcesSchema);