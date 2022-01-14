const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Middleware
app.use(express.json());

module.exports = app;
