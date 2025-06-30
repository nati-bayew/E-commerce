const Product = require("../../models/product");

const filteredProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-hightolow" } = req.query;

    let filteres = {};

    if (category.length) {
      filteres.category = { $in: category.split(",") };
    }
    if (brand.length) {
      filteres.brand = { $in: brand.split(",") };
    }

    let sort = {};

    switch (sortBy) {
      case "price-hightolow":
        sort.price = -1;
        break;
      case "price-lowtohigh":
        sort.price = 1;
        break;
      case "title-atoz":
        sort.title = 1;
        break;
      case "title-ztoa":
        sort.title = -1;
        break;
      default:
        sort.price = 1;
        break;
    }

    const products = await Product.find(filteres).sort(sort);
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log("Opps something went wrong", error);
    res.status(500).json({
      success: false,
      message: "Error ocurred",
    });
  }
};

const getProductDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.log("Opps something went wrong", error);
    res.status(500).json({
      success: false,
      message: "Error ocurred",
    });
  }
};

module.exports = { filteredProducts, getProductDetail };
