const express =require('express');
const router =express.Router();

const{
  validRegister,validLogin,validForgotPassword,validResetPassword
}=require('../helpers/valid');

const{
    registerController,activationController,loginController,changePasswordController,registerNewAdminController,isUserEmptyController
}=require('../controller/auth.controller.js');



router.post('/register',registerController)
//router.post('/register',validRegister,registerController)
router.post('/activate',activationController)
router.post('/login',loginController)
router.post('/changepassword',changePasswordController)
router.post('/registernewadmin',registerNewAdminController)
router.get('/userisempty',isUserEmptyController)




module.exports= router