const express = require("express");
const { registerUser } = require("../../controler/auth/auth-control");
const router = express.Router();

router.post("/register", (req, res) => {
  console.log("Route hit!"); // Check if this logs
  res.send("Route works!");
});
console.log("route called");

module.exports = router;
