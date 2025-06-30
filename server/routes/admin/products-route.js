const express = require("express");

const {
  handleImageUpload,
  addProduct,
  featchProduct,
  updateProduct,
  deleteProduct,
} = require("../../controller/admin/products-controller");
const { upload } = require("../../config/cloudinary");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addProduct);
router.get("/get", featchProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);
module.exports = router;
