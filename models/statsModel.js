const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const statSchema=new Schema({
    Likes:{
        type:Number
    },
    followers:{
        type:Number
    },
    comments:{
        type:Number
    },
    lives:{
        type:Number
    }

},{
    timestamps:true
})
module.exports=mongoose.model('stat',statSchema)