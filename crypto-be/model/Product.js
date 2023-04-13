const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    default:
      "https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image.png",
  },
  price: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 0,
  },
  sold: {
    type: Number,
    default: 0,
  },
  tags: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
