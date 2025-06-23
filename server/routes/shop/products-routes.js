const express = require("express");
const { filteredProducts } = require("../../controler/shop/product-controller");

const router = express.Router();

router.get("/get", filteredProducts);

module.exports = router;
