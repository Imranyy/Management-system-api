const Admin =require('../models/adminModel');
const User=require('../models/userModels')
const asyncHandler=require('express-async-handler');

//admin login
const adminlogin=asyncHandler(async(req,res)=>{
    const {email}=req.body;
    //check for user phonenumber
    const user=await Admin.findOne({email})
        res.send({
            id:user.id,
            pic:user.pic,
            name:user.name,
            password:user.password,
            email:user.email,
            token:user.token
        })
        
    
});
//add admin
const addAdmin=(req,res)=>{
    Admin.create(req.body).then((admin)=>{
        res.send({
            id:admin._id,
            admin:admin.name,
            email:admin.email,
            password:admin.password
        }).catch((err)=>{console.log(err)})
       })
}
//get user data
const getUserdata=(req,res)=>{
  User.find({}).then((users)=>{
    res.send(users)
  })
};

//get admin data
const getAdmin=(req,res)=>{
    const email=req.body;
    Admin.findOne(email)
    .then((admindata)=>{
        res.send({
            id:admindata.id,
            pic:admindata.pic,
            name:admindata.name,
            password:admindata.password,
            email:admindata.email,
            token:admindata.token
        }).catch(err=>console.log(err))
    })
}

//delete user
const deleteUser=(req,res)=>{
    const {id}=req.params;
    User.findOneAndDelete({_id: id}).then((user)=>{
        res.send(user)
    })
};

//delete admin
const deleteAdmin=(req,res)=>{
    const {id}=req.params;
    Admin.findOneAndDelete({_id: id}).then((delAdmin)=>{
        res.send(delAdmin)
    }).catch((err)=>{
        res.send(err)
    })
}

module.exports={
    adminlogin,
    addAdmin,
    getUserdata,
    deleteUser,
    deleteAdmin,
    getAdmin
}