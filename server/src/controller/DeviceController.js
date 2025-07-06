const deviceSevice = require('../service/DeviceService')
const { StatusCodes } = require('http-status-codes');
const ErrorHandling = require("../ErrorHandling/ErrorHandling");

exports.addDevice = async (req, res, next) => {
    try {
         if (!req.isAuthenticated || req.grantedAuthority !=  require("../security/JwtUtils").Option.SUPDERADMIN)
            throw new ErrorHandling(403, "You do not have permission");
        const result = await deviceSevice.addDevice(req.body);
        res.status(StatusCodes.CREATED).json({
            success: true,
            data: result
        })
    } catch (e) {
        next(e);
    }
}
exports.getDevices = async (req, res, next) => {
    try {
         if (!req.isAuthenticated)
            throw new ErrorHandling(403, "You do not have permission");
        const result = await deviceSevice.getDevices(req.query);
        res.status(StatusCodes.OK).json({
            success: true,
            data: result
        })
    } catch (e) {
        next(e);
    }
}
exports.updateDevice = async (req, res, next) => {
    try {
         if (!req.isAuthenticated || req.grantedAuthority !=  require("../security/JwtUtils").Option.SUPDERADMIN)
            throw new ErrorHandling(403, "You do not have permission");
        const result = await deviceSevice.updateDeviceById(req.params, req.body);
        res.status(StatusCodes.CREATED).json({
            success: true,
            data: result
        })
    } catch (e) {
        next(e);
    }
}
exports.deleteDevice = async (req, res, next) => {
    try {
         if (!req.isAuthenticated || req.grantedAuthority !=  require("../security/JwtUtils").Option.SUPDERADMIN)
            throw new ErrorHandling(403, "You do not have permission");
        const result = await deviceSevice.deleteDeviceById(req.params);
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Device deleted successfully"
        })

    } catch (e) {
        next(e);
    }
}
exports.getDeviceById = async (req, res, next) => {
    try {
         if (!req.isAuthenticated || req.grantedAuthority !=  require("../security/JwtUtils").Option.SUPDERADMIN)
            throw new ErrorHandling(403, "You do not have permission");
        const result = await deviceSevice.getDeviceById(req.params);
        res.status(StatusCodes.OK).json({
            success: true,
            data: result
        })
    } catch (e) {
        next(e);
    }
}
