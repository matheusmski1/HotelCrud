const guestModel = require("../models/guest");
const reservationModel = require("../models/reservation");

const getGuestById = async (request, response) => {
  const guest = await guestModel.find({ _id: request.params.id });

  try {
    response.send(guest);
  } catch (error) {
    response.status(500).send(error);
  }
};

const getReservationIdByGuestId = async (request, response) => {
  const reservation = await reservationModel
    .find()
    .elemMatch("reservation", { guestId: request.params.id });
  try {
    response.send(reservation);
  } catch (error) {
    response.status(500).send(error);
  }
};

const createGuest = async (request, response) => {
  const guest = new guestModel(request.body);

  try {
    await guest.save();
    response.send(guest);
  } catch (error) {
    response.status(500).send(error);
  }
};

module.exports = {
  getGuestById,
  createGuest,
  getReservationIdByGuestId,
};
