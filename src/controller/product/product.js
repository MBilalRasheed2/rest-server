const slugify = require("slugify");

const productModel = require("../../models/product");

const categoryModel = require("../../models/category");
exports.createProduct = (req, res) => {
  const {
    name,
    price,
    description,
    offer,
    review,
    category,
    quantity,
  } = req.body;
  let productPictures = [];
  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }
  const prooduct = new productModel({
    name: name,
    slug: slugify(name),
    price,
    quantity,
    description,
    offer,
    productPictures,
    review,
    category,
    createdBy: req.user._id,
  });
  prooduct.save((err, prod) => {
    if (err) {
      return res.status(400).json({
        message: err,
      });
    }
    if (prod) {
      return res.status(200).json({
        product: prod,
      });
    }
  });
};

exports.getProducts = (req, res) => {
  const { slug } = req.params;

  categoryModel
    .findOne({ slug: slug })
    .select("_id type")
    .exec((err, category) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      if (category) {
        productModel.find({ category: category._id }).exec((err, products) => {
          if (err) {
            return res.status(400).json({
              error: err,
            });
          }
          if (category.type) {
            if (products.length > 0) {
              return res.status(200).json({
                products,
                priceRange: {
                  under5k: 5000,
                  under10k: 10000,
                  under15k: 15000,
                  under20k: 20000,
                  under30k: 30000,
                },
                productsByPrice: {
                  under5k: products.filter((prod) => prod.price <= 5000),
                  under10k: products.filter(
                    (prod) => prod.price > 5000 && prod.price <= 10000
                  ),
                  under15k: products.filter(
                    (prod) => prod.price > 10000 && prod.price <= 15000
                  ),
                  under20k: products.filter(
                    (prod) => prod.price > 15000 && prod.price <= 20000
                  ),
                  under30k: products.filter(
                    (prod) => prod.price > 20000 && prod.price <= 30000
                  ),
                },
              });
            }
          } else {
            return res.status(200).json({
              products,
            });
          }
        });
      }
    });
};

exports.singleproduct = (req, res) => {
  const { productId } = req.params;
  if (productId) {
    productModel.findOne({ _id: productId }).exec((err, pro) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }

      if (pro) {
        return res.status(200).json({
          product: pro,
        });
      }
    });
  } else {
    if (err) {
      return res.status(400).json({
        error: "something went wrong",
      });
    }
  }
};
