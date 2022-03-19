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

const providerSchema = mongoose.Schema({
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
  outlet: [
    {
      outletType: {
        type: String,
        required: true,
      },
    },
    // validate: [arrayLimit(this.length()), "${PATH} exceeds the limit of 2"],
  ],
  cuisines: [
    {
      mealType: {
        type: String,
        required: true,
      },
    },
  ],
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
    // validate: [Days(this.length), "Restaurant should work minimum 1 day "],
  },
  ownRole: {
    type: String,
    default: "provider",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("provider", providerSchema);

// Bakery, Dhaba, Mess, Quick Bites, Food Truck,
//
//
//
//
//
//
//
