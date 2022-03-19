const express = require("express");
const router = express.Router();
// Imports from controller dir
const {
  registerUser,
  loginUser,
  logout,
} = require("../controller/user.controller");

// Product Route API's

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);

module.exports = router;
