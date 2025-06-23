const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../../controler/auth/auth-control");
const authCheck = require("../../middleware/auth-check");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/auth-check", authCheck, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated Verifayed! ",
    user,
  });
});
module.exports = router;
