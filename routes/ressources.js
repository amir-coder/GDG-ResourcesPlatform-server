var express=require('express');
var router=express.Router();
const ressourcesController=require('../controllers/ressources');
const verification=require('../middleware/verification');
const auth=require('../middleware/auth');
const cookieParser=require('cookie-parser');

router.use(cookieParser());

router.get('/',ressourcesController.getAllRessources);
router.get('/:id_ressource',ressourcesController.getRessourceById);
router.post('/add',auth.isLogged,verification.verifieRessource,ressourcesController.addRessource);
router.delete('/delete/:id_ressource',auth.isLogged,auth.isAuthenticated,ressourcesController.deleteRessource);
router.get('/validate/:id_ressource',auth.isLogged,auth.isAuthenticated,ressourcesController.validateRessource);

module.exports = router