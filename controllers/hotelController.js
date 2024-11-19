const hotelModel = require("../models/hotel");

const getHotelById = async (req, res) => {
  try {
    const hotel = await hotelModel.find({ _id: req.params.id });
    res.send(hotel);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateHotel = async (req, res) => {
  try {
    const hotel = await hotelModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(hotel);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteHotel = async (req, res) => {
  try {
    const hotel = await hotelModel.findByIdAndDelete(req.params.id);
    res.send(hotel);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createHotel = async (req, res) => {
  try {
    const newHotel = new hotelModel(req.body);
    await newHotel.save();
    res.send(newHotel);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getHotelById, updateHotel, deleteHotel, createHotel };
