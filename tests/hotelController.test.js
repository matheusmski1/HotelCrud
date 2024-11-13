const { getHotelById, getHotelByReservationId, createHotel } = require("../controllers/hotelController");
const hotelModel = require("../models/hotel");

// Mock do hotelModel
jest.mock("../models/hotel");

describe("Hotel Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  

  it("should get hotel by ID", async () => {
    const mockHotel = { _id: "123", hotelName: "Hotel Test" };
    hotelModel.find.mockResolvedValue([mockHotel]);

    const request = { params: { id: "123" } };
    const response = { send: jest.fn(), status: jest.fn().mockReturnThis() };

    await getHotelById(request, response);

    expect(hotelModel.find).toHaveBeenCalledWith({ _id: "123" });
    expect(response.send).toHaveBeenCalledWith([mockHotel]);
    expect(response.status).not.toHaveBeenCalled();
  });

  it("should return error if unable to get hotel by ID", async () => {
    const error = new Error("Database error");
    hotelModel.find.mockRejectedValue(error);

    const request = { params: { id: "123" } };
    const response = { send: jest.fn(), status: jest.fn().mockReturnThis() };

    await expect(getHotelById(request, response)).rejects.toThrow(error);
    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.send).toHaveBeenCalledWith(error);
  });

  it("should get hotel by reservation ID", async () => {
    const mockHotel = { _id: "123", hotelName: "Hotel Test", reservationsId: [{ _id: "456" }] };
    hotelModel.find.mockResolvedValue([mockHotel]);

    const request = { params: { id: "456" } };
    const response = { send: jest.fn(), status: jest.fn().mockReturnThis() };

    await getHotelByReservationId(request, response);

    expect(hotelModel.find).toHaveBeenCalledWith({
      reservationsId: { $elemMatch: { _id: "456" } },
    });
    expect(response.send).toHaveBeenCalledWith([mockHotel]);
    expect(response.status).not.toHaveBeenCalled();
  });

  it("should return error if unable to get hotel by reservation ID", async () => {
    const error = new Error("Database error");
    hotelModel.find.mockRejectedValue(error);

    const request = { params: { id: "456" } };
    const response = { send: jest.fn(), status: jest.fn().mockReturnThis() };

    await expect(getHotelByReservationId(request, response)).rejects.toThrow(error);
    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.send).toHaveBeenCalledWith(error);
  });
  it("should create a hotel", async () => {
    const requestBody = { hotelName: "New Hotel", reservationsId: [] };

    // Mock the save method to return a plain object
    const saveMock = jest.fn().mockResolvedValueOnce({ ...requestBody });

    hotelModel.mockImplementationOnce(() => ({
      save: saveMock,
      // Add other properties as needed, like `hotelName` and `reservationsId`
      hotelName: 'New Hotel',
      reservationsId: [],
  }));

  
    const request = { body: requestBody };
    const response = { send: jest.fn(), status: jest.fn().mockReturnThis() };

    await createHotel(request, response);

    expect(response.send).toHaveBeenCalled();
    expect(response.status).not.toHaveBeenCalled();
});

  it("should return error if unable to create hotel", async () => {
    const error = new Error("Database error");

    // Mockando o hotelModel para que o método save rejeite a promise com um erro
    hotelModel.mockImplementationOnce(() => ({
      save: jest.fn().mockRejectedValue(error),
    }));

    const request = { body: { hotelName: "New Hotel", reservationsId: [] } };
    const response = { send: jest.fn(), status: jest.fn().mockReturnThis() };

    // Chama a função de criação
    await createHotel(request, response);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.send).toHaveBeenCalledWith(error);
  });
});
