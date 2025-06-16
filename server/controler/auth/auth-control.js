const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
console.log("inter");
const registerUser = async (req, res) => {
  console.log("helo");
  console.log("req", req);
  console.log("req.body", req.body);
  const { userName, email, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "successfuly  new user registred",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Opps Something occured",
    });
  }
};
console.log("route-end");

module.exports = { registerUser };
