const mongoose=require('mongoose');
const Schema=mongoose.Schema

const adminSchema=new Schema({
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
},{
    timestamps:true
});
module.exports=mongoose.model('admin',adminSchema)