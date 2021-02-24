const express=require('express');
const multer = require("multer");
const path = require("path");
const shortId = require("shortid");
const {createPage,getPage}=require('../controller/admin/page');
const router=express.Router();
const {requireProfile,adminMiddleware}=require('../controller/common-middleware');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, shortId.generate() + "-" + file.originalname);
    },
  });
  const upload = multer({ storage });
router.post('/page/create',requireProfile,adminMiddleware,upload.fields([
   { name:'banners'},
    {name:'products'}
]),createPage);
router.get('/page/:category/:type',getPage);

module.exports = router;