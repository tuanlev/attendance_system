const ShiftService = require('../service/ShiftService');
const { StatusCodes } = require('http-status-codes');
const ErrorHandling = require('../ErrorHandling/ErrorHandling');

// Thêm shift mới
exports.addShift = async (req, res, next) => {
    try {
         if (!req.isAuthenticated || req.grantedAuthority !=  require("../security/JwtUtils").Option.ADMIN)
            throw new ErrorHandling(403, "You do not have permission");
        const data = await ShiftService.addShift(req.body);
        res.status(StatusCodes.CREATED).json({
            success: true,
            data
        });
    } catch (e) {
        next(e);
    }
};

// Lấy danh sách shifts
exports.getShifts = async (req, res, next) => {
    try {
         if (!req.isAuthenticated || req.grantedAuthority !=  require("../security/JwtUtils").Option.ADMIN)
            throw new ErrorHandling(403, "You do not have permission");
        const data = await ShiftService.getShifts(req.query);
        res.status(StatusCodes.OK).json({
            success: true,
            data
        });
    } catch (e) {
        next(e);
    }
};

// Lấy shift theo id
exports.getShiftById = async (req, res, next) => {
    try {
         if (!req.isAuthenticated || req.grantedAuthority !=  require("../security/JwtUtils").Option.ADMIN)
            throw new ErrorHandling(403, "You do not have permission");
        const data = await ShiftService.getShiftById({ shift_id: req.params.shift_id });
        res.status(StatusCodes.OK).json({
            success: true,
            data
        });
    } catch (e) {
        next(e);
    }
};

// Cập nhật shift theo id
exports.updateShiftById = async (req, res, next) => {
    try {
         if (!req.isAuthenticated || req.grantedAuthority !=  require("../security/JwtUtils").Option.ADMIN)
            throw new ErrorHandling(403, "You do not have permission");
        const data = await ShiftService.updateShiftById({ shift_id: req.params.shift_id }, req.body);
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Update successful",
            data
        });
    } catch (e) {
        next(e);
    }
};

// Xóa shift theo id
exports.deleteShiftById = async (req, res, next) => {
    try {
         if (!req.isAuthenticated && req.grantedAuthority !=  require("../security/JwtUtils").Option.ADMIN)
            throw new ErrorHandling(403, "You do not have permission");
        const result = await ShiftService.deleteShiftById({ shift_id: req.params.shift_id });
        res.status(StatusCodes.OK).json({
            success: true,
            ...result
        });
    } catch (e) {
        next(e);
    }
};