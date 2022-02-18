const express = require("express");
const app = express();
const {
  getGuestById,
  createGuest,
  getReservationIdByGuestId,
} = require("../controllers/guestController");

app.get("/guest/:id", getGuestById);
app.get("/guest/reservations/:id", getReservationIdByGuestId);
app.post("/createGuest", createGuest);

module.exports = app;
