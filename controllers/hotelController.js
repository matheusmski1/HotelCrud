const hotelModel = require("../models/hotel");

const getHotelById = async (request, response) => {
  const hotel = await hotelModel.find({ _id: request.params.id });

  try {
    response.send(hotel);
  } catch (error) {
    response.status(500).send(error);
  }
};

const getHotelByReservationId = async (request, response) => {
  const hotel = await hotelModel
    .find()
    .elemMatch("reservationsId", { _id: request.params.id });
  try {
    response.send(hotel);
  } catch (error) {
    response.status(500).send(error);
  }
};

const createHotel = async (request, response) => {
  const hotel = new hotelModel(request.body);

  try {
    await hotel.save();
    response.send(hotel);
  } catch (error) {
    response.status(500).send(error);
  }
};

module.exports = {
  getHotelById,
  createHotel,
  getHotelByReservationId,
};
