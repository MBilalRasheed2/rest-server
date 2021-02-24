const express=require('express');

const router=express.Router();
const {addUserAddress,getUserAddress}=require('../controller/address/address');
const {userMiddleware,adminMiddleware,requireProfile}=require('../controller/common-middleware');
router.post('/address/getUserAddress',requireProfile,userMiddleware,getUserAddress);
router.post('/address/addUserAddress',requireProfile,userMiddleware,addUserAddress);

module.exports = router;