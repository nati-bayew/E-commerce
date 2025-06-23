const { ImageUploadToCloudinary } = require("../../config/cloudinary");
const Products = require("../../models/product");
const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;

    const result = await ImageUploadToCloudinary(url);

    res.json({
      success: true,
      message: "image uploaded successfully",
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "error occured!",
    });
  }
};

//addProduct
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const newProduct = new Products({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
      message: "Successfuly add new product",
    });
  } catch (error) {
    console.log("Opps something went occured", error);
    res.status(500).json({
      success: false,
      message: "Opps something went wrong",
    });
  }
};

//featchProduct
const featchProduct = async (req, res) => {
  try {
    const allProducts = await Products.find({});

    res.status(200).json({
      success: true,
      data: allProducts,
    });
  } catch (error) {
    console.log("Opps something went occured", error);
    res.status(500).json({
      success: false,
      message: "Opps something went wrong",
    });
  }
};
//updateProduct

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;
    let findProductById = await Products.findById(id);
    if (!findProductById)
      return res.status(404).json({
        success: false,
        message: "The given product id was not found ",
      });

    findProductById.title = title || findProductById.title;
    findProductById.description = description || findProductById.description;
    findProductById.category = category || findProductById.category;
    findProductById.brand = brand || findProductById.brand;
    findProductById.price = price === "" ? 0 : price || findProductById.price;
    findProductById.salePrice =
      salePrice === " " ? 0 : salePrice || findProductById.salePrice;
    findProductById.totalStock = totalStock || findProductById.totalStock;
    findProductById.image = image || findProductById.image;

    await findProductById.save();
    res.status(201).json({
      success: true,
      message: "Product edited successfully",
      data: findProductById,
    });
  } catch (error) {
    console.log("Opps something went occured", error);
    res.status(500).json({
      success: false,
      message: "Opps something went wrong",
    });
  }
};

//deleteProduct
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const findProduct = await Products.findByIdAndDelete(id);
    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "The given product id was not found ",
      });

    res.status(200).json({
      success: true,
      message: "Successfully product deleted ",
    });
  } catch (error) {
    console.log("Opps something went occured", error);
    res.status(500).json({
      success: false,
      message: "Opps something went wrong",
    });
  }
};
module.exports = {
  handleImageUpload,
  addProduct,
  featchProduct,
  updateProduct,
  deleteProduct,
};
