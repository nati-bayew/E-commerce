const Order = require("../../models/order");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});

    if (!orders) {
      return res.status(404).json({
        success: false,
        message: "Opps orders not found",
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

const getOrderDetailForAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "userId is mandatory",
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

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;
    console.log(orderStatus, "nati hellow");

    const orders = await Order.find({});

    if (!orders) {
      return res.status(404).json({
        success: false,
        message: "Opps orders not found",
      });
    }

    await Order.findByIdAndUpdate(id, { orderStatus });
    res.status(200).json({
      success: true,
      message: "Successfully updated the status",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Opps something went wrong!",
    });
  }
};
module.exports = { getAllOrders, getOrderDetailForAdmin, updateOrderStatus };
