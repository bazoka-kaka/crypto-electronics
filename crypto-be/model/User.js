const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Editor: Number,
    Admin: Number,
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    products: Array,
    totalPrice: {
      type: Number,
      default: 0,
    },
    paid: {
      type: Boolean,
      default: false,
    },
  },
  notifications: {
    Offers: {
      type: Number,
      default: 2000,
    },
    Payment: Number,
    Updates: Number,
  },
  refreshToken: String,
});

module.exports = mongoose.model("User", UserSchema);
