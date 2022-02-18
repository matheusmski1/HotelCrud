const mongoose = require("mongoose");

//Fiz o modelo do banco de dados desse jeito para haver relacao de entidades dentro do mesmo banco.

const hotelSchema = new mongoose.Schema({
  hotelName: String,
  reservationsId: [{ _id: String }],
});

const hotel = mongoose.model("Hotel", hotelSchema);

module.exports = hotel;
