const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const reviewSchema=new Schema({
    name:{
        type:String,
        require:true
    },
    review:{
        type:String,
        require:true
    }
})
module.exports=mongoose.model('review',reviewSchema);