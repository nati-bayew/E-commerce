const express = require("express");
const {
  filteredProducts,
  getProductDetail,
} = require("../../controller/shop/product-controller");

const router = express.Router();

router.get("/get", filteredProducts);
router.get("/get/:id", getProductDetail);

module.exports = router;
