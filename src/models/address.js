const mongoose = require("mongoose");

const userAddress = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 50,
    },
    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },
    pinCode: {
      type: String,
      required: true,
      trim: true,
    },
    locality: {
      type: String,
      required: true,
      trim: true,
      min: 10,
      max: 50,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      min: 10,
      max: 50,
    },
    cityDistrictTown: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    landMark: {
      type: String,
      min: 10,
      max: 100,
    },
    alternatePhone: {
      type: String,
    },
    addressType: {
      type: String,
      required: true,
      trim: true,
      enum: ["home", "work"],
    },
  },
  {
    timestamps: true,
  }
);

const userAddressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    address: [userAddress],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserAddress", userAddressSchema);
