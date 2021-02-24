const express = require("express");
const multer = require("multer");
const {
  requireProfile,
  adminMiddleware,
} = require("../controller/common-middleware");
const path = require("path");

const {
  createProduct,
  getProducts,
  singleproduct,
} = require("../controller/product/product");
const shortId = require("shortid");
const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortId.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post(
  "/product/create",
  requireProfile,
  adminMiddleware,
  upload.array("productPicture"),
  createProduct
);
router.get("/product/singleProduct/:productId", singleproduct);
router.get("/product/:slug", getProducts);

module.exports = router;
