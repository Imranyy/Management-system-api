const Admin =require('../models/adminModel');
const User=require('../models/userModels');
const Review=require('../models/reviewModel');
const Order=require('../models/userOrderModel');
const mongoose=require('mongoose')
const asyncHandler=require('express-async-handler');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
require('dotenv').config();

//admin login
const adminlogin=asyncHandler(async(req,res)=>{
    const {email,name}=req.body;
    const user=await Admin.findOne({email,name})
    if(user){
        res.send({
            _id:user.id,
            name:user.name,
            email:user.email, 
            token:generateToken(user.id)
        })
    }else{
        res.status(400).send('Invalid Credentials ☠☠')
    }
    
});

//add admin
const addAdmin=async(req,res)=>{
    const {name,email,password}=req.body;   
    //check if user exist
    const userExist=await Admin.findOne({email});
    if(userExist){
        res.status(400).send('Admin already Exists ☠☠!!')
    }
    //Hashing password 
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt);
    //create user
    const admin=await Admin.create({
        name,
        email,
        password:hashedPassword
        
    })
    if(admin){
        res.status(201).send({
            id:admin._id,
            admin_name:admin.name,
            email:admin.email,
            token:generateToken(admin.id)
        })
    }else{
        res.status(400).send('Invalid Admin Data ☠☠');
    }
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
        })
    }).catch(err=>res.send(err))
}

//get all admins
const getAllAdmins=(req,res)=>{
  Admin.find({}).then((admin)=>{
    res.send(admin)
  }).catch(err=>res.send(err))
}

//change admin password
const changePassword=asyncHandler(async(req,res)=>{
    const {id}=req.params;
      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send({error:'No such User ☠☠'})
      } 
      const updateAccount=await Admin.findOneAndUpdate({_id: id},{
          ...req.body
      })
      if(!updateAccount){
          return res.status(400).send({error:'No such User ☠☠'})
        }
        res.status(200).send('updated')
})

//delete review
const deleteReview=(req,res)=>{
 const{id}=req.params;
 Review.findOneAndDelete({_id: id}).then((delRev)=>{
    res.status(200).send(delRev)
 }).catch(err=>res.send(err))
}

//detele order
const deleteOrder=(req,res)=>{
 const {id}=req.params;
 Order.findOneAndDelete({_id :id}).then((delOrd)=>{
    res.status(200).send(delOrd)
 })
}

//delete user
const deleteUser=(req,res)=>{
    const {id}=req.params;
    User.findOneAndDelete({_id: id}).then((user)=>{
        res.send(user)
    }).catch(err=>res.send(err))
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

//admin auth middleware
const protect=asyncHandler(async(req,res,next)=>{
    let token
    if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
        try{
            //get token from headers
            token=req.headers.authorization.split(' ')[1]
            //verify token
            const decoded=jwt.verify(token,process.env.JWT_SECRET_ADMIN);
            //get user from the token
            req.user=await Admin.findById(decoded.id).select('password')
            next()

        }catch (error){
            console.log(error)
            res.status(401).send('Not Authorized ☠☠')
        }
    }
    if(!token){
        res.status(401).send('Not Authorized, No Token Available ☠☠')
    }
})

//generate token
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET_ADMIN,{
        expiresIn:'309d'
    })
};

//verify
const verify=asyncHandler(async(req,res)=>{
    try{
        res.send(true)
    } catch(error){
        console.log(error.message);
        res.status(401).send('Not Authorized ☠☠');
    }
})

module.exports={
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
}