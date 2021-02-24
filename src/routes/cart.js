const express=require('express');

const router=express.Router();
const {addItemTOCart,getCartItems}=require('../controller/cart/cart');
const {userMiddleware,adminMiddleware,requireProfile}=require('../controller/common-middleware');
router.post('/cart/addItemToCart',requireProfile,userMiddleware,addItemTOCart);
router.get('/cart/getCartItems',requireProfile,userMiddleware,getCartItems);

module.exports = router;