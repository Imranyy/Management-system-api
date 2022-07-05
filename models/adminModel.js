const mongoose=require('mongoose');
const Schema=mongoose.Schema

const adminSchema=new Schema({
    pic:{
        type:String
    },
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    token:{
        type:String
    }
});
module.exports=mongoose.model('admin',adminSchema)