const Product = require("../../models/product");

const filteredProducts = async (req, res) => {
  try {
    const products = await Product.find({});
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

module.exports = { filteredProducts };
