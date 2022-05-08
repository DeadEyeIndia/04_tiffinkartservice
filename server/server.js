const path = require("path");
const cloudinary = require("cloudinary");
const app = require("./app");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const connectDB = require("./config/dbConfig");

// Config
const PORT = process.env.PORT || 3011;

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled Rejection`);
});

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(PORT, () => {
  console.log(`Server is listening on => http://locahost:${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err}`);
  console.log(`Shutting down the server due to unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
