const  User=require('../models/userModels');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const mongoose=require('mongoose');
const asyncHandler=require('express-async-handler');
require('dotenv').config();

//register user constroller
const registerUser=asyncHandler(async(req,res)=>{
    const {username,email,password,pic}=req.body
    //check if email enter is a valid email entry and if fields are empty
    const validEmail=(userEmail)=>{
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
    if(!username||!email||!password){
        res.status(400)
        throw new Error('Please add fields')
    }else if(!validEmail(email)){
        return res.send('Invalid Email')
    }
    //check if user exist
    const userExist=await User.findOne({email});
    if(userExist){
        res.status(400)
        throw new Error('User already Exists!!')
    }
    //Hashing password 
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt);
    //create user
    const user=await User.create({
        username,
        pic,
        email,
        password:hashedPassword
        
    })
    if(user){
        res.status(201).send({
            _id:user.id,
            pic:user.pic,
            username:user.username,
            email:user.email,
            token:generateToken(user.id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid User Data')
    }
});

//login user constroller
const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    //check for user phonenumber
    const user=await User.findOne({email})
    if(user&&(await bcrypt.compare(password,user.password))){
        res.send({
            _id:user.id,
            pic:user.pic,
            name:user.username,
            email:user.email,
            token:generateToken(user.id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid Credentials')
    }
});

//delete user
const deleteUser=asyncHandler(async(req,res)=>{
  const {id}=req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).send({error:'No such User'})
  }
  const deleteUserAccount=await User.findOneAndDelete({_id: id})
  if(!deleteUserAccount){
    return res.status(40).send({error:'No such User'})
  }
  res.status(200).send('Account deleted')
});

//update user
const updateUser=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.IsValid(id)){
        return res.status(404).send({error:'No such User'})
    }  
    const updateAccount=await User.findOneAndUpdate({_id: id},{
        ...req.body
    })
    if(!updateAccount){
        return res.status(40).send({error:'No such User'})
      }
      res.status(200).send('updated')
})
//auth Middlerware
const protect=asyncHandler(async(req,res,next)=>{
    let token
    if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
        try{
            //get token from headers
            token=req.headers.authorization.split(' ')[1]
            //verify token
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            //get user from the token
            req.user=await User.findById(decoded.id).select('password')
            next()

        }catch (error){
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not Authorized, No Token Available')
    }
});

 //verify user controller
 const verify=asyncHandler(async(req,res)=>{
    try {
        res.send(true)
    } catch (err) {
        console.log(err.message);
        res.status(401).send('Not Authorized!')
    }
 });

//downloadpage controller
const downloadPage=asyncHandler(async(req,res)=>{
    const {_id,username,email,pic}=await User.findById(req.user.id)
    res.status(200).send({
        id:_id,
        username,
        email,
        pic
    })
});

//generate token
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
};

module.exports={ 
    protect,
    registerUser,
    loginUser,
    verify,
    deleteUser,
    updateUser,
    downloadPage
}