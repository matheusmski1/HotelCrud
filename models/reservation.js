const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  reservation: [
    {
      roomNumber: { type: Number, required: true, unique: true },
      reservationPrice: { type: Number, required: true },
      reservationConfirmDate: { type: String, required: true },
      initialReserveDate: { type: String, required: true },
      finalReserveDate: { type: String, required: true },
      status: String,
      guestId: String,
      hotelId: String,
    },
  ],
});

const reservation = mongoose.model("Reservation", reservationSchema);

module.exports = reservation;
