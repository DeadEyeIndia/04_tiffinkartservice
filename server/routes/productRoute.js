const express = require("express");
const router = express.Router();
// Imports from controller dir
const { getProduct } = require("../controller/productController");

// Product Route API's
router.route("/get").get(getProduct);

module.exports = router;
