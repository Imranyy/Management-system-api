const Order =require('../models/userOrderModel');
const Review=require('../models/reviewModel');
const Request=require('../models/requestModel');
const Stats=require('../models/statsModel')
const asyncHandler=require('express-async-handler');

//post order
const order=asyncHandler(async(req,res)=>{
    const or=await Order.create(req.body)
    res.status(200).send({
        createdAt:or.createdAt,
        email:or.email,
        username:or.username,
        choose:or.choose,
        media:or.media,
        amount:or.amount,
        price:or.price
    })

});

//post stats
const postStat=(req,res)=>{
    Stats.create(req.body)
    .then((sta)=>{
        res.status(200).send({
            likes:sta.likes,
            followers: sta.followers,
            comments: sta.comments,
            lives: sta.lives
        })
    })
}

//post reviews
const review=(req,res)=>{
     Review.create(req.body).then((rev)=>{
        res.status(200).send({
           pic:rev.pic, 
           username:rev.name,
           review:rev.review
        })
     })
       
    
};

//post request
const request=(req,res)=>{
    Request.create(req.body).then((re)=>{
        res.status(200).send({
           pic:re.pic,
           name:re.name,
           email:re.email,
           reason:re.reason,
           password:re.password
        })
    }).catch(err=>res.status(500).send(err))
}

//get requests
const getRequest=(req,res)=>{
   Request.find({}).sort({createdAt:-1}).then((re)=>{
    res.send(re)
   })
}

//get user orders as history
const history=(req,res)=>{
    const email=req.body;
    Order.findOne(email).sort({createdAt:-1}).then((hist)=>{
        res.status(200).send({
            email:hist.email,
            createdAt:hist.createdAt,
            username:hist.username,
            choose:hist.choose,
            media:hist.media,
            amount:hist.amount,
            price:hist.price
        })
        
    }).catch(err=>res.send(err))
};

//get all orders
const getAllOrder=(req,res)=>{
 Order.find({}).sort({createdAt:-1}).then((orders)=>{
    res.send(orders)
 }).catch(err=>res.send(err))
}

//get reviews
const getReviews=(req,res)=>{
    Review.find({}).then((rev)=>{
        res.status(200).send(rev)
    })
};

//get stats
const getStats=asyncHandler(async(req,res)=>{
    const stats=await Stats.find({})
    res.status(200).send(stats)
})

module.exports={
    order,
    review,
    history,
    getReviews,
    getStats,
    getAllOrder,
    postStat,
    request,
    getRequest
}