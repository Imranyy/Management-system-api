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


//connect to db 
mongoose.connect(process.env.DATABASE,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{ 
    //listening to port
    const port=process.env.PORT||3000;
    app.listen(port,()=>{
    console.log(`Server running at ${port}`)
  }); 
}).catch((err)=>{
    console.log(err)
}); 
mongoose.Promise=global.Promise; 

//cors
const options={
    origin:'https://fir-site-bb2a5.web.app'
}
app.use(cors(options));

//routes middleware 
app.use('/api',require('./routes/User'));

 