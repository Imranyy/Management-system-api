const express=require('express');
const router1=express.Router();
const {
    adminlogin,
    addAdmin,
    getUserdata,
    deleteUser,
    deleteAdmin,
    getAdmin
}=require('../controllers/adminController');

//admin login route
router1.post('/login',adminlogin);

//add an admin user
router1.post('/add',addAdmin)

//get admin userinfo
router1.get('/adminData',getUserdata);

//get Admin data
router1.get('/data',getAdmin)

//change password
//router1.patch('/:id',)

//admin delete user 
router1.delete('/:id',deleteUser);

//delete admin
router1.delete('/delete/:id',deleteAdmin)

module.exports=router1