const positionSevice = require('../service/PositionService')
const { StatusCodes } = require('http-status-codes');
exports.addPosition = async (req, res, next) => {
    try {
        const result = await positionSevice.addPosition(req.body);
        res.status(StatusCodes.CREATED).json({
            success: true,
            data: result
        })
    } catch (e) {
        next(e);
    }
}
exports.getPositions = async (req, res, next) => {
    try {
        const result = await positionSevice.getPositions(req.query);
        res.status(StatusCodes.OK).json({
            success: true,
            data: result
        })
    } catch (e) {
        next(e);
    }
}
exports.updatePosition = async (req, res, next) => {
    try {
        const result = await positionSevice.updatePositionById(req.params, req.body);
        res.status(StatusCodes.CREATED).json({
            success: true,
            data: result
        })
    } catch (e) {
        next(e);
    }
}
exports.deletePosition = async (req, res, next) => {
    try {
        const result = await positionSevice.deletePositionById(req.params);
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Position deleted successfully"
        })

    } catch (e) {
        next(e);
    }
}
exports.getPositionById = async (req, res, next) => {
    try {
        const result = await positionSevice.getPositionById(req.params);
        res.status(StatusCodes.OK).json({
            success: true,
            data: result
        })
    } catch (e) {
        next(e);
    }
}
