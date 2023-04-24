const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotifSchema = new Schema({
  userId: String,
  type: Number,
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Notification", NotifSchema);
