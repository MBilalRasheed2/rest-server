const express = require("express");
const {addCategory,getCategory,updateCategories,deleteCategories}=require('../controller/category/category');
const {requireProfile,adminMiddleware}=require('../controller/common-middleware');
const router = express.Router();
const shortId = require("shortid");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortId.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage });
router.post("/category/create",requireProfile,adminMiddleware,upload.single('categoryImage'),addCategory);
router.post("/category/update",upload.single('categoryImage'),updateCategories);
router.get("/category/getcategory",getCategory);
router.post("/category/delete",deleteCategories);

module.exports = router;
