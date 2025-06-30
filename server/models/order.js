const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: String,
  orderDate: String,
  orderStatus: String,
  cartItems: [
    {
      productId: String,
      title: String,
      quantity: Number,
      price: Number,
    },
  ],
  addressInfo: [
    {
      addressId: String,
      name: String,
      address: String,
      city: String,
      phone: String,
    },
  ],
  totalAmount: Number,
});

module.exports = mongoose.model("Order", orderSchema);
