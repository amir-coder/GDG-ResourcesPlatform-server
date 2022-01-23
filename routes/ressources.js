var express=require('express');
var router=express.Router();
const ressourcesController=require('../controllers/ressources');


router.get('/',ressourcesController.getAllRessources);
router.get('/:id_ressource',ressourcesController.getRessourceById);
router.post('/add',ressourcesController.addRessource);
router.delete('/delete/:id_ressource',ressourcesController.deleteRessource);
router.get('/validate/:id_ressource',ressourcesController.validateRessource);

module.exports = router