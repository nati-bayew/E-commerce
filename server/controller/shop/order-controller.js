const Order = require("../../models/order");

const addOrders = async (req, res) => {
  try {
    const {
      userId,
      totalAmount,
      orderDate,
      orderStatus,

      cartItems,
      addressInfo,
    } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Invalid request you miss something",
      });
    }

    const newOrder = new Order({
      userId,
      orderDate,
      orderStatus,
      cartItems,
      addressInfo,
      totalAmount,
    });

    await newOrder.save();
    res.status(200).json({
      success: true,
      data: newOrder,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Opps something went wrong!",
    });
  }
};

const getOrersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is mandatory",
      });
    }

    const orders = await Order.find({ userId });
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Opps something went wrong!",
    });
  }
};

const getOrderDetail = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "OrderId is mandatory",
      });
    }

    const orders = await Order.findById(id);
    if (!orders) {
      return res.status(404).json({
        success: false,
        message: "orders not found",
      });
    }
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Opps something went wrong!",
    });
  }
};
module.exports = { addOrders, getOrersByUserId, getOrderDetail };
