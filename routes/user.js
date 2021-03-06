var express=require('express');
var router=express.Router();
const cookieParser=require('cookie-parser');
const userController = require("../controllers/user")

router.use(cookieParser());

router.post("/api/change-password",userController.changePassword);
router.post("/api/login",userController.login);
router.post("/api/register",userController.register);
router.post("/api/user-profile",userController.editProfile)
router.post('/getInfo' ,userController.getInfo);
module.exports = router