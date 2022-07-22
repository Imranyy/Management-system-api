const express=require('express');
const router=express.Router();

const{ 
    registerUser,
    loginUser,
    protect,
    deleteUser,
    updateUser,
    verify,
    downloadPage
}=require('../controllers/userController')

//register user
router.post('/register',registerUser);

//login user
router.post('/login',loginUser);

//verify user route
router.get('/verify',protect,verify);

//protected route
router.get('/userdata',protect,downloadPage);

//update user
router.patch('/:id',updateUser);

//delete a User
router.delete('/:id',deleteUser);

module.exports=router;