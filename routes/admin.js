const express=require('express');
const router1=express.Router();
const {
    adminlogin,
    addAdmin,
    getUserdata,
    deleteReview,
    deleteOrder,
    deleteUser,
    deleteAdmin,
    getAdmin,
    getAllAdmins,
    changePassword,
    protect,
    verify
}=require('../controllers/adminController');

//admin login route
router1.post('/login',adminlogin);

//add an admin user
router1.post('/add',addAdmin)

//get admin userinfo
router1.get('/getAllUsers',protect,getUserdata);

//get Admin data
router1.get('/data',protect,getAdmin);

//get all admins
router1.get('/admins',protect,getAllAdmins);

//verify
router1.get('/adminVerify',protect,verify)

//change password
router1.patch('/:id',protect,changePassword)

//delete review
router1.delete('/deleteRev/:id',protect,deleteReview)

//delete order
router1.delete('/deleteOrd/:id',protect,deleteOrder)

//admin delete user 
router1.delete('/deleteUser/:id',protect,deleteUser);

//delete admin
router1.delete('/delete/:id',protect,deleteAdmin);

module.exports=router1