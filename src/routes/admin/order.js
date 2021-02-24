const exress = require("express");
const router = exress.Router();
const {
  requireProfile,
  adminMiddleware,
} = require("../../controller/common-middleware");
const { updateOrder,getCustomerOrders } = require("../../controller/admin/order");
router.post("/order/update", requireProfile, adminMiddleware, updateOrder);
router.post("/order/getCustomerOrders", requireProfile, adminMiddleware, getCustomerOrders);


module.exports = router;
