const { getHotelById, updateHotel, deleteHotel, createHotel } = require('../controllers/hotelController');
const hotelModel = require("../models/hotel");

jest.mock("../models/hotel");

describe('Hotel Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should get hotel by ID', async () => {
    const mockHotel = { _id: '123', hotelName: 'Hotel Test' };
    hotelModel.find.mockResolvedValue([mockHotel]);

    const req = { params: { id: '123' } };
    const res = { send: jest.fn(), status: jest.fn().mockReturnThis() };

    await getHotelById(req, res);

    expect(hotelModel.find).toHaveBeenCalledWith({ _id: '123' });
    expect(res.send).toHaveBeenCalledWith([mockHotel]);
  });

  test('should return error if unable to get hotel by ID', async () => {
    const error = new Error('Database error');
    hotelModel.find.mockRejectedValue(error);

    const req = { params: { id: '123' } };
    const res = { send: jest.fn(), status: jest.fn().mockReturnThis() };

    await getHotelById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(error);
  });

  test('should update a hotel', async () => {
    const mockHotel = { _id: '123', hotelName: 'Updated Hotel' };
    hotelModel.findByIdAndUpdate.mockResolvedValue(mockHotel);

    const req = { params: { id: '123' }, body: { hotelName: 'Updated Hotel' } };
    const res = { send: jest.fn(), status: jest.fn().mockReturnThis() };

    await updateHotel(req, res);

    expect(hotelModel.findByIdAndUpdate).toHaveBeenCalledWith('123', { hotelName: 'Updated Hotel' }, { new: true });
    expect(res.send).toHaveBeenCalledWith(mockHotel);
  });

  test('should return error if unable to update a hotel', async () => {
    const error = new Error('Database error');
    hotelModel.findByIdAndUpdate.mockRejectedValue(error);

    const req = { params: { id: '123' }, body: { hotelName: 'Updated Hotel' } };
    const res = { send: jest.fn(), status: jest.fn().mockReturnThis() };

    await updateHotel(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(error);
  });

  test('should delete a hotel', async () => {
    const mockHotel = { _id: '123', hotelName: 'Deleted Hotel' };
    hotelModel.findByIdAndDelete.mockResolvedValue(mockHotel);

    const req = { params: { id: '123' } };
    const res = { send: jest.fn(), status: jest.fn().mockReturnThis() };

    await deleteHotel(req, res);

    expect(hotelModel.findByIdAndDelete).toHaveBeenCalledWith('123');
    expect(res.send).toHaveBeenCalledWith(mockHotel);
  });

  test('should return error if unable to delete a hotel', async () => {
    const error = new Error('Database error');
    hotelModel.findByIdAndDelete.mockRejectedValue(error);

    const req = { params: { id: '123' } };
    const res = { send: jest.fn(), status: jest.fn().mockReturnThis() };

    await deleteHotel(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(error);
  });

  test('should create a hotel', async () => {
    const requestBody = { hotelName: 'New Hotel', reservationsId: [] };
  
    const saveMock = jest.fn().mockResolvedValue(requestBody);
    hotelModel.mockImplementation(() => ({ save: saveMock }));
  
    const req = { body: requestBody };
    const res = { send: jest.fn(), status: jest.fn().mockReturnThis() };
  
    await createHotel(req, res);
  
    expect(saveMock).toHaveBeenCalled();
  });
  
  
  test('should return error if unable to create hotel', async () => {
    const error = new Error('Validation error');
    const saveMock = jest.fn().mockRejectedValue(error);
    hotelModel.mockImplementation(() => ({ save: saveMock }));
  
    const req = { body: { hotelName: 'Invalid Hotel' } };
    const res = { send: jest.fn(), status: jest.fn().mockReturnThis() };
  
    await createHotel(req, res);
  
    expect(saveMock).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(error);
  });
});
