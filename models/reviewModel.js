const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const reviewSchema=new Schema({
    pic:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    review:{
        type:String,
        require:true
    }
},{
    timestamps:true
})
module.exports=mongoose.model('review',reviewSchema);