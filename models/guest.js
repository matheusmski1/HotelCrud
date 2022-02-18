const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
  name: String,
  email: String,
  birthday: String,
  phone: Number,
  city: String,
  state: String,
  country: String,
});

const guest = mongoose.model("Guest", guestSchema);

module.exports = guest;
