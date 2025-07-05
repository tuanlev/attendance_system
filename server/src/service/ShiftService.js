const shiftDTO = require('../DTOs/ShiftDTO');
const shiftRepository = require('../repositories/ShiftRepository');
const { StatusCodes } = require('http-status-codes');
const ErrorHandling = require('../ErrorHandling/ErrorHandling');

// Thêm shift mới
exports.addShift = async (shift) => {
    // shiftQuery sẽ kiểm tra và chuẩn hóa dữ liệu đầu vào
    const shiftData = shiftDTO.shiftQuery(shift);
    const created = await shiftRepository.createShift(shiftData);
    return shiftDTO.shiftResponse(created);
};

// Lấy danh sách shifts (có thể tìm kiếm theo tên)
exports.getShifts = async ({ keyword }) => {
    const shifts = await shiftRepository.getShifts(keyword ? keyword : null);
    return shifts.map(shiftDTO.shiftResponse);
};

// Lấy shift theo id
exports.getShiftById = async ({ shiftId }) => {
    if (shiftId === undefined || shiftId === null)
        throw new ErrorHandling(StatusCodes.BAD_REQUEST, "shiftId is required");
    const shift = await shiftRepository.findShiftById(shiftId);
    if (!shift)
        throw new ErrorHandling(StatusCodes.NOT_FOUND, "Shift not found");
    return shiftDTO.shiftResponse(shift);
};

// Cập nhật shift theo id
exports.updateShiftById = async ({ shiftId }, shift) => {
    if (shiftId === undefined || shiftId === null)
        throw new ErrorHandling(StatusCodes.BAD_REQUEST, "shiftId is required");
    const shiftData = shiftDTO.shiftQuery(shift);
    const updated = await shiftRepository.updateShiftById(shiftId, shiftData);
    return shiftDTO.shiftResponse(updated);
};

// Xóa shift theo id
exports.deleteShiftById = async ({ shiftId }) => {
    if (shiftId === undefined || shiftId === null)
        throw new ErrorHandling(StatusCodes.BAD_REQUEST, "shiftId is required");
    return await shiftRepository.deleteShiftById(shiftId);
};