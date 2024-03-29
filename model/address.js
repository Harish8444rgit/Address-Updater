// addressModel.js

const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  version: { type: Number, default: 0 },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
