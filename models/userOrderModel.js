const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const userOrder=new Schema({
    user_id:{
        type:String,
        require:true,
        unique:true
    },
    order:{
        username:{
            type:String,
            require:true
        },
        choose:{
            type:String,
            require:true
        },
        media:{
            type:String,
            require:true
        },
        amount:{
            type:Number,
            require:true
        },
        price:{
            type:Number,
            require:true
        }
    }

},{
    timestamps:true
})
 module.exports=mongoose.model('userOrder',userOrder);