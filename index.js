const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require('body-parser')
const formData=require('express-form-data')
require('dotenv').config();


//set app
const app=express();

//bodyparser middleware
app.use(formData.parse())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//cors
app.use(cors({origin:'http://localhost:3000'}))
app.use(cors({origin:' https://fir-site-bb2a5.web.app'}))
app.use(cors({origin:'https://fir-site-bb2a5.firebaseapp.com'}))

//connect to db 
mongoose.connect(process.env.DATABASE,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{ 
    //listening to port
    const port=5000||process.env.PORT;
    app.listen(port,()=>{
    console.log(`Server running at ${port}`)
  }); 
}).catch((err)=>{
    console.log(err)
}); 
mongoose.Promise=global.Promise; 


//routes middleware 
app.use('/api',require('./routes/User'));

 