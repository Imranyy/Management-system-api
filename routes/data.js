const express=require('express');
const router=express.Router();
const {
    order,
    review,
    history,
    getReviews,
    postStat,
    getStats
}=require('../controllers/dataController')

//post orders
router.post('/orders',order);

//post reviews
router.post('/reviews',review);

//post stats
router.post('/stats',postStat)

//get orders
router.get('/orders',history);

//get reviews
router.get('/reviews',getReviews);

//getting stats
router.get('/stats',getStats);

module.exports=router;