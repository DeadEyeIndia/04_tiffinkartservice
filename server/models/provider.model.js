const mongoose = require("mongoose");
const validator = require("validator");

function arrayLimit(val) {
  return val.length <= 10;
}

function Days(val) {
  if (val.length < 1) {
    return val.length < 1;
  } else if (val.length > 7) {
    return val.length > 7;
  }
}

const phones = {
  "en-IN": /^(\+?91|0)?[6789]\d{9}$/,
};

const ownerSchema = mongoose.Schema({
  nameRest: {
    type: String,
    required: [true, "Please enter restaurant "],
    unique: true,
    trim: true,
  },
  addressRest: {
    type: String,
    required: [true, "Please enter your address"],
  },
  restLocality: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: [true, "Please enter mobile number"],
    validate: [validator.isMobilePhone(), "Please enter valid number"],
    unique: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  outlet: {
    outlettype: [
      {
        type: String,
        required: true,
      },
    ],
    // validate: [arrayLimit(), "${PATH} exceeds the limit of 2"],
  },
  cuisines: {
    mealtype: [
      {
        type: String,
        required: true,
      },
    ],
    // validate: [arrayLimit, " exceeds the limit of 2"],
  },
  images: [
    {
      url: {
        type: String,
        required: true,
      },
    },
  ],
  workDays: {
    days: [
      {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
      },
    ],
    // validate: [Days, "Restaurant should work minimum 1 day "],
  },
  role: {
    type: String,
    default: "owner",
  },
  //   user: {
  //     type: mongoose.Schema.ObjectId,
  //     ref: "user",
  //     required: true,
  //   },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("owner", ownerSchema);
// Bakery, Dhaba, Mess, Quick Bites, Food Truck,
//
//
//
//
//
//
//
