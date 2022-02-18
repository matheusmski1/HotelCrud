const express = require("express");
const app = express();
const {
  getHotelById,
  createHotel,
  getHotelByReservationId,
} = require("../controllers/hotelController");

app.get("/hotel/:id", getHotelById);
app.get("/hotel/reservations/:id", getHotelByReservationId);
app.post("/createHotel", createHotel);

module.exports = app;
