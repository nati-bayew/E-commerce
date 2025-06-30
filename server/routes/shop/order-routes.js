const express = require("express");
const {
  addOrders,
  getOrersByUserId,
  getOrderDetail,
} = require("../../controller/shop/order-controller");
const router = express.Router();

router.post("/add", addOrders);
router.get("/get/:userId", getOrersByUserId);
router.get("/get-detail/:id", getOrderDetail);

module.exports = router;
