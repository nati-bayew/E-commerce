const jwt = require("jsonwebtoken");
const authCheck = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorized User",
    });
  try {
    const decode = jwt.verify(token, "CLIENT_SECURITY_KEY");
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized User",
    });
  }
};
module.exports = authCheck;
