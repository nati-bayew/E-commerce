const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    userId: String,
    address: String,
    city: String,
    phone: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
