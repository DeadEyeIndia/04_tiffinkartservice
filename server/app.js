const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Import middleware
const errorMiddleware = require("./middleware/error");

// Imports from routes directory
const user = require("./routes/user.routes");
const provider = require("./routes/provider.routes");

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Use Routes
app.use("/v1", user);
app.use("/v1", provider);

// Middleware for errors
app.use(errorMiddleware);

module.exports = app;
