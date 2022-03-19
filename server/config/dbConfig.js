const mongoose = require("mongoose");

const DB_CONNECT = process.env.DB_URI;

const connectDB = () => {
  mongoose
    .connect(DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb connected with server => ${data.connection.host}`);
    });
};

module.exports = connectDB;
