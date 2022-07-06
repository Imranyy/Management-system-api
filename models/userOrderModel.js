const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const userOrder=new Schema({
    email:{
        type:String,
        require:true,
    },
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

},{
    timestamps:true
})
 module.exports=mongoose.model('userOrder',userOrder);