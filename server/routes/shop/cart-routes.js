const express = require("express");
const {
  addToCart,
  updateCart,
  getCart,
  deleteCart,
} = require("../../controller/shop/cart-controller");
const router = express.Router();

router.get("/get/:userId", getCart);
router.post("/add", addToCart);
router.put("/update", updateCart);
router.delete("/:userId/:productId", deleteCart);

module.exports = router;
