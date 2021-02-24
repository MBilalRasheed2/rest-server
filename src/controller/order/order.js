const orderModel = require("../../models/order");
const Cart = require("../../models/cart");
exports.addOrder = (req, res) => {
  Cart.deleteOne({ user: req.user._id }).exec((error, result) => {
    if (error) {
      return res.status(400).json({
        error: error,
      });
    }
    if (result) {
      req.body.user = req.user._id;
     
      req.body.orderStatus = [
        {
          type: "ordered",
          date: new Date(),
          isCompleted: true,
        },
        {
          type: "packed",
          isCompleted: false,
        },
        {
          type: "shipped",
          isCompleted: false,
        },
        {
          type: "delivered",
          isCompleted: false,
        },
      ];
      const order = new orderModel(req.body);
      order.save((err, or) => {
        if (err) {
          return res.status(400).json({
            message: err,
          });
        }
        if (or) {
          return res.status(200).json({
            oder: or,
          });
        }
      });
    }
  });
};

exports.getOrder = (req, res) => {
  orderModel
    .find({ user: req.user._id })
    .select("_id paymentStatus items")
    .populate("items.productId", "_id name productPictures")
    .exec((error, order) => {
      if (error) {
        return res.status(400).json({
          error: error,
        });
      }
      if (order) {
        return res.status(200).json({
          oder: order,
        });
      }
    });
};
