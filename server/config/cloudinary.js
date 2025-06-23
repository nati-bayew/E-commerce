//CLOUDINARY_URL=cloudinary://942622589927168:2biwLA3xPaGlXt2G78yq8yGevOQ@dc7y4cpov
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "dc7y4cpov",
  api_key: "942622589927168",
  api_secret: "2biwLA3xPaGlXt2G78yq8yGevOQ",
});

const storage = new multer.memoryStorage();

async function ImageUploadToCloudinary(file) {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return result;
  } catch (error) {
    console.log("Opps error ocurred...", error);
  }
}

const upload = multer({ storage });

module.exports = { upload, ImageUploadToCloudinary };
