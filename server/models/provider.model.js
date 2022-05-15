const mongoose = require("mongoose");
const validator = require("validator");

const providerSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  nameRest: {
    type: String,
    unique: true,
    required: [true, "Please enter tiffin service name"],
  },
  addressRest: {
    type: String,
    required: [true, "Please enter tiffin service address"],
  },
  restLocality: {
    type: String,
    required: [true, "Please enter tiffin service address"],
  },
  contactNumber: {
    type: String,
    match: /^([9]{1})([234789]{1})([0-9]{8})$/,
    unique: true,
    required: [true, "Please enter mobile number"],
  },
  city: {
    type: String,
    required: [true, "Please enter city"],
  },
  state: {
    type: String,
    required: [true, "Please enter state"],
  },
  tiffinType: {
    type: String,
    enum: ["Food Mess", "Chef/Cook", "Food Mess, Chef/Cook"],
    required: [true, "Please select Tiffin provider type"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    enum: ["Vegetarian", "Non-Vegetarian", "Vegetarian, Non-Vegetarian"],
    required: [true, "Please select category"],
  },
  service: {
    type: String,
    enum: ["Home Delivery", "At Premises", "Home Delivery, At Premises"],
    required: [true, "Please select service type"],
  },
  singleprice: {
    type: String,
    required: [true, "Please enter your single tiffin price"],
  },
  weeklyprice: {
    type: String,
    required: [true, "Please enter your all week tiffin price"],
  },
  monthlyprice: {
    type: String,
    required: [true, "Please enter your all month tiffin price"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "users",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  ownRole: {
    type: String,
    default: "provider",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("providersdata", providerSchema);
