const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
// Imports from routes directory
const product = require("./routes/productRoute");

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use Routes
app.use("/v1", product);

module.exports = app;
