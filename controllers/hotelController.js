const hotelModel = require("../models/hotel");

const getHotelById = async (request, response) => {
  try {
    const hotel = await hotelModel.find({ _id: request.params.id });
    response.send(hotel);
  } catch (error) {
    response.status(500).send(error);
    throw error; // Lança o erro para que a Promise seja rejeitada
  }
};


const getHotelByReservationId = async (request, response) => {
  try {
    // Use elemMatch corretamente dentro do objeto de consulta
    const hotel = await hotelModel.find({
      reservationsId: { $elemMatch: { _id: request.params.id } } // Uso correto do $elemMatch
    });

    response.send(hotel);
  } catch (error) {
    response.status(500).send(error);
    throw error; // Lançar o erro para rejeitar a Promise
  }
};


const createHotel = async (request, response) => {
  try {
    const hotel = new hotelModel(request.body);
    console.log('Hotel before save:', hotel);
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