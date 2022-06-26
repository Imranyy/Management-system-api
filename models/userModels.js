const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const userSchema= new Schema({
    username:{
        type:String,
        require:[true, 'Please enter your name']
    },
    password:{
        type:String,
        require:[true,'Please enter password']
    },
    email:{
        type:String,
        require:[true,'Please enter your Email Address'],
        unique:true
    }
    
},{
    timestamps:true
});
 
 module.exports= mongoose.model('user',userSchema);