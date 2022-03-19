const express = require("express");
const router = express.Router();

// Import Authenticated from auth.js
const { isAuthenticatedUser } = require("../middleware/auth.js");

// Import from Provider controller
const { registerProvider } = require("../controller/provider.controller");

// Provider Route API's
router
  .route("/user/tiffin/register")
  .post(isAuthenticatedUser, registerProvider);

module.exports = router;
