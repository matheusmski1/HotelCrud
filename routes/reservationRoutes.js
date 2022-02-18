const express = require("express");
const app = express();
const {
  getReservationsByGuestId,
  createReservation,
  getReservationById,
  updateStatus,
} = require("../controllers/reservationController");

app.get("/reservations/guest/:id", getReservationsByGuestId);
app.get("/reservations/:id", getReservationById);
app.post("/createReservation", createReservation);
app.post("/updateStatus", updateStatus);

module.exports = app;
