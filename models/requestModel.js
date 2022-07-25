const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const requestSchema=new Schema({
    pic:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    reason:{
        type:String,
        require:true
    }
},{
    timestamps:true
})
module.exports=mongoose.model('request',requestSchema);