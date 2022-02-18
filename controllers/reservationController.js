const reservationModel = require("../models/reservation");
const hotelModel = require("../models/hotel");

const getReservationsByGuestId = async (request, response) => {
  const reservation = await reservationModel
    .find()
    .elemMatch("reservation", { guestId: request.params.id });

  try {
    response.send(reservation);
  } catch (error) {
    response.status(500).send(error);
  }
};

const getReservationById = async (request, response) => {
  const reservation = await reservationModel.find({ _id: request.params.id });

  try {
    response.send(reservation);
  } catch (error) {
    response.status(500).send(error);
  }
};

const updateStatus = async (request, response) => {
  const reservation = await reservationModel.updateOne(
    { reservation: { $elemMatch: { roomNumber: request.body.roomNumber } } },
    { $set: { "reservation.$.status": request.body.status } }
  );

  try {
    response.send(reservation);
  } catch (error) {
    response.status(500).send(error);
  }
};

const createReservation = async (request, response) => {
  const reservation = new reservationModel(request.body);
  reservation.reservation.push(request.body);

  await hotelModel.findOneAndUpdate(
    { _id: request.body.hotelId },
    { $push: { reservationsId: { _id: reservation._id } } }
  );

  await reservation.save();
  try {
    response.send(reservation);
  } catch (error) {
    response.status(500).send(error);
  }
};

module.exports = {
  getReservationsByGuestId,
  createReservation,
  getReservationById,
  updateStatus,
};
