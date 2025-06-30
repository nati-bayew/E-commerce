const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

//register controller
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide userName, email and password",
    });
  }

  const checkUser = await User.findOne({ email });
  if (checkUser) {
    return res.json({
      success: false,
      message: "This User Already Registered",
    });
  }
  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "successfuly  registred",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Opps Something occured",
    });
  }
};

//login controller

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "The User Does't Have Account Please Register First!",
      });

    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword)
      return res.json({
        success: false,
        message: "Invalid Email Or Password!",
      });
    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECURITY_KEY",
      { expiresIn: "60mins" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Successfully logged In",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).json({
      success: false,
      message: "Oops, something went wrong",
    });
  }
};

//logout

const logoutUser = async (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged Out Successfully",
  });
};

module.exports = { registerUser, loginUser, logoutUser };
