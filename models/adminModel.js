const mongoose=require('mongoose');
const Schema=mongoose.Schema

const adminSchema=new Schema({
    id:{
        type:String,
        require:true
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
        type:string,
        require:true
    }
});
module.exports=mongoose.model('admin',adminSchema)