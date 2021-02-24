const express = require("express");
const {addOrder,getOrder}=require('../controller/order/order');
const {requireProfile,userMiddleware}=require('../controller/common-middleware');
const router = express.Router();

router.post("/order/add",requireProfile,userMiddleware,addOrder);
router.get("/order/get",requireProfile,userMiddleware,getOrder);


module.exports = router;
