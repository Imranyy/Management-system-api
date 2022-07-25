const express=require('express');
const router=express.Router();
const {
    order,
    review,
    history,
    getReviews,
    postStat,
    getAllOrder,
    getStats,
    request,
    getRequest
}=require('../controllers/dataController')

//post orders
router.post('/orders',order);

//post reviews
router.post('/reviews',review);

//post stats
router.post('/stats',postStat)

//get history
router.post('/order',history);

//post admin request
router.post('/request',request);

//get requests
router.get('/request',getRequest);

//get all orders
router.get('/orders',getAllOrder)

//get reviews
router.get('/reviews',getReviews);

//getting stats
router.get('/stats',getStats);

module.exports=router;