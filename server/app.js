const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Import middleware
const errorMiddleware = require("./middleware/error");

// Imports from routes directory
const user = require("./routes/user.routes");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Use Routes
app.use("/v1", user);

// Middleware for errors
app.use(errorMiddleware);

module.exports = app;
