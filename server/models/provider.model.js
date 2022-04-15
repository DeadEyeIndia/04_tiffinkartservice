const mongoose = require("mongoose");
const validator = require("validator");

const providerSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
  },
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
  workDays: [
    {
      type: String,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },
  ],
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
