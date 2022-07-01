const express=require('express');
const router=express.Router();
const cors=require('cors');
 
const{ 
    registerUser,
    loginUser,
    protect,
    verify,
    downloadPage
}=require('../controllers/userController')

//register user
router.post('/register',cors(),registerUser);

//login user
router.post('/login',cors(),loginUser);

//verify user route
router.get('/verify',cors(),protect,verify)

//protected route
router.get('/userdata',cors(),protect,downloadPage);

module.exports=router;