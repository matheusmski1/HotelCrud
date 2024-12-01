

const express = require("express");
const app = express();
const {
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel,
} = require("../controllers/hotelController");

app.get("/hotel/:id", getHotelById);
app.post("/createHotel", createHotel);
app.post("/update/hotel/:id", updateHotel);
app.delete("/delete/hotel/:id", deleteHotel);

module.exports = app;
