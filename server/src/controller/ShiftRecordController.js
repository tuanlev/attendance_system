const shiftrecordService = require('../service/ShiftRecordService')
const { StatusCodes } = require('http-status-codes');
const ErrorCustom = require("../errorcustom/ErrorCustom");

exports.getShiftRecords = async (req, res, next) => {
    try {
         if (!req.isAuthenticated || req.grantedAuthority !=  require("../security/JwtUtils").Option.ADMIN)
            throw new ErrorCustom(403, "You do not have permission");
        if (!req.access) throw new Error("no device found")
        const result = await shiftrecordService.getShiftRecords(req.query,req.access);
        res.status(StatusCodes.OK).json({
            success: true,
            data: result
        })
    } catch (e) {
        next(e);
    }
}
