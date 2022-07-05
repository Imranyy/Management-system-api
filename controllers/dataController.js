const Order =require('../models/userOrderModel');
const Review=require('../models/reviewModel');
const Stats=require('../models/statsModel')
const asyncHandler=require('express-async-handler');

//post order
const order=asyncHandler(async(req,res)=>{
    const[user_id,username,choose,media,amount,price]=req.body;
    await Order.create({
        user_id,
        username,
        choose,
        media,
        amount,
        price
    })
    res.status(200).send('Order stored')

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
        }).catch((err)=>{res.send(err)})
    })
}

//post reviews
const review=(req,res)=>{
     Review.create(req.body).then((rev)=>{
        res.status(200).send({
           username:rev.name,
           review:rev.review
        }).catch((err)=>{res.send(err)})
     })
       
    
};

//get user orders as history
const history=asyncHandler(async(req,res)=>{
 const[user_id,username,choose,media,amount,price]=req.body;
    await Order.findById(req.user_id)
    res.status(200).send({
        id: user_id,
        name: username,
        choose: choose,
        media: media,
        amount: amount,
        To_pay: price
    })
});

//get reviews
const getReviews=asyncHandler(async(req,res)=>{
    const reviews=await Review.find({})
    res.status(200).send(reviews)
});

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
    postStat
}