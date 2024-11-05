const { getHotelById, getHotelByReservationId, createHotel } = require("../controllers/hotelController");
const hotelModel = require("../models/hotel");

jest.mock("../models/hotel");  // Mock do hotelModel

describe("Hotel Controller", () => {

  let response;

  beforeEach(() => {
    // Mock de response
    response = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();  // Limpa os mocks após cada teste
  });

  describe("getHotelById", () => {
    it("deve retornar um hotel pelo ID", async () => {
      const mockHotel = { _id: "123", name: "Hotel Test" };
      hotelModel.find.mockResolvedValue([mockHotel]);

      const request = { params: { id: "123" } };

      await getHotelById(request, response);

      expect(hotelModel.find).toHaveBeenCalledWith({ _id: "123" });
      expect(response.send).toHaveBeenCalledWith([mockHotel]);
    });

    it("deve retornar um erro 500 se falhar", async () => {
      const error = new Error("Database Error");
      hotelModel.find.mockRejectedValue(error);

      const request = { params: { id: "123" } };

      await getHotelById(request, response);

      expect(hotelModel.find).toHaveBeenCalledWith({ _id: "123" });
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.send).toHaveBeenCalledWith(error);
    });
  });

  describe("getHotelByReservationId", () => {
    it("deve retornar um hotel com base no reservationId", async () => {
      const mockHotel = { _id: "123", reservationsId: [{ _id: "456" }] };
      hotelModel.find.mockResolvedValue([mockHotel]);

      const request = { params: { id: "456" } };

      await getHotelByReservationId(request, response);

      expect(hotelModel.find).toHaveBeenCalledWith();
      expect(hotelModel.find().elemMatch).toHaveBeenCalledWith("reservationsId", { _id: "456" });
      expect(response.send).toHaveBeenCalledWith([mockHotel]);
    });

    it("deve retornar um erro 500 se falhar", async () => {
      const error = new Error("Database Error");
      hotelModel.find.mockRejectedValue(error);

      const request = { params: { id: "456" } };

      await getHotelByReservationId(request, response);

      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.send).toHaveBeenCalledWith(error);
    });
  });

  describe("createHotel", () => {
    it("deve criar e salvar um novo hotel", async () => {
      const hotelData = { name: "New Hotel", location: "City" };
      const mockHotel = { ...hotelData, save: jest.fn().mockResolvedValue(hotelData) };

      hotelModel.mockImplementationOnce(() => mockHotel);

      const request = { body: hotelData };

      await createHotel(request, response);

      expect(hotelModel).toHaveBeenCalledWith(hotelData);
      expect(mockHotel.save).toHaveBeenCalled();
      expect(response.send).toHaveBeenCalledWith(hotelData);
    });

    it("deve retornar um erro 500 se falhar ao salvar", async () => {
      const error = new Error("Save Error");
      const hotelData = { name: "New Hotel", location: "City" };
      const mockHotel = { ...hotelData, save: jest.fn().mockRejectedValue(error) };

      hotelModel.mockImplementationOnce(() => mockHotel);

      const request = { body: hotelData };

      await createHotel(request, response);

      expect(mockHotel.save).toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.send).toHaveBeenCalledWith(error);
    });
  });

});
