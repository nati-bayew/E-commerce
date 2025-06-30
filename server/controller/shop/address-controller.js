const Address = require("../../models/address");
const addAddress = async (req, res) => {
  try {
    const { userId, address, phone, city } = req.body;

    if (!userId || !address || !phone || !city) {
      res.status(400).json({
        success: false,
        message: "Invalid data provided",
      });
    }

    const newAddress = new Address({
      userId,
      address,
      phone,
      city,
    });
    await newAddress.save();
    res.status(201).json({
      success: true,
      data: newAddress,
      message: "Successfully Added New Address",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Opps Something went wrong!..",
    });
  }
};
const getAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId is required",
      });
    }

    const addressList = await Address.find({ userId });

    res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Opps Something went wrong!..",
    });
  }
};
const updateAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      res.status(400).json({
        success: false,
        message: "User and address Id is required",
      });
    }

    const editAddress = await Address.findOneAndUpdate(
      { userId, _id: addressId },
      formData,
      { new: true }
    );

    if (!editAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      data: editAddress,
      message: "Successfully updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Opps Something went wrong!..",
    });
  }
};
const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      res.status(400).json({
        success: false,
        message: "User and address Id is required",
      });
    }

    const deleteAddressById = await Address.findOneAndDelete({
      userId,
      _id: addressId,
    });

    if (!deleteAddressById) {
      res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      data: deleteAddressById,
      message: "Successfully deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Opps Something went wrong!..",
    });
  }
};

module.exports = { addAddress, getAddress, updateAddress, deleteAddress };
