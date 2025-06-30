const Product = require("../../models/product");
const Cart = require("../../models/carts");
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const findcrrentProductId = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (findcrrentProductId === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[findcrrentProductId].quantity += quantity;
    }

    await cart.save();
    res.status(200).json({
      success: true,
      data: cart,
      message: "Successfuly Item added ",
    });
  } catch (error) {
    console.log("Opps something went wrong", error);
    res.status(500).json({
      success: false,
      message: "Error ocurred",
    });
  }
};

const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is mandatory",
      });
    }
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const validItem = cart.items.filter((productItem) => productItem.productId);
    if (validItem.length < cart.items.length) {
      cart.items = validItem;
      await cart.save();
    }

    const populateCartItem = validItem.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItem,
      },
    });
  } catch (error) {
    console.log("Opps something went wrong", error);
    res.status(500).json({
      success: false,
      message: "Error ocurred",
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const findcrrentProductId = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findcrrentProductId === -1) {
      res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    cart.items[findcrrentProductId].quantity = quantity;
    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });
    const populateCartItem = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItem,
      },
      message: "Successfully update item",
    });
  } catch (error) {
    console.log("Opps something went wrong", error);
    res.status(500).json({
      success: false,
      message: "Error ocurred",
    });
  }
};

const deleteCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      res.status(400).json({
        success: false,
        message: "User id is mandatory",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });
    if (!cart) {
      res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId
    );

    await cart.save();
    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populateCartItem = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItem,
      },
    });
  } catch (error) {
    console.log("Opps something went wrong", error);
    res.status(500).json({
      success: false,
      message: "Error ocurred",
    });
  }
};

module.exports = { addToCart, updateCart, getCart, deleteCart };
