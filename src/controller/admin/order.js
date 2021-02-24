const Order = require("../../models/order");

exports.updateOrder = (req, res) => {
  console.log("this is working");
  const userId=req.body.userId;
  const type=req.body.type;
  console.log("userId",userId,type);
 Order.updateOne(
  { _id: userId, "orderStatus.type": type },
  {
    "$set": {
      "orderStatus.$": [
        { type: req.body.type, date: new Date(), isCompleted: true },
      ],
    },
  }
).exec((error, order) => {
  if (error) return res.status(400).json({ error });
  if (order) {
    res.status(201).json({myorder: order });
  }
});

};

exports.getCustomerOrders = async (req, res) => {
  await Order.find({})
    .populate("items.productId", "name")
    .exec((error,order)=>{
      if (error) return res.status(400).json({ error });
      if (order) {
        res.status(201).json({orders: order });
      }
    });
  
};  
