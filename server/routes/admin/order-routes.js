const express = require("express");
const {
  getAllOrders,
  getOrderDetailForAdmin,
  updateOrderStatus,
} = require("../../controller/admin/order-controller");
const router = express.Router();

router.get("/get", getAllOrders);
router.get("/details/:id", getOrderDetailForAdmin);
router.put("/update/:id", updateOrderStatus);

module.exports = router;
