const express=require('express');
const router=express.Router();

//post orders
router.post('/orders');

//post reviews
router.post('/reviews',);

//get orders
router.get('/orders');

//get reviews
router.get('/reviews',);

//getting stats
router.get('/stats');

module.exports=router;