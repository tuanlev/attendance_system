const departmentSevice = require('../service/DepartmentService')
const { StatusCodes } = require('http-status-codes');
exports.addDepartment = async (req, res, next) => {
    try {
        const result = await departmentSevice.addDepartment(req.body);
        res.status(StatusCodes.CREATED).json({
            success: true,
            data: result
        })
    } catch (e) {
        next(e);
    }
}
exports.getDepartments = async (req, res, next) => {
    try {
        const result = await departmentSevice.getDepartments(req.query);
        res.status(StatusCodes.OK).json({
            success: true,
            data: result
        })
    } catch (e) {
        next(e);
    }
}
exports.updateDepartment = async (req, res, next) => {
    try {
        const result = await departmentSevice.updateDepartmentById(req.params, req.body);
        res.status(StatusCodes.CREATED).json({
            success: true,
            data: result
        })
    } catch (e) {
        next(e);
    }
}
exports.deleteDepartment = async (req, res, next) => {
    try {
        const result = await departmentSevice.deleteDepartmentById(req.params);
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Department deleted successfully"
        })

    } catch (e) {
        next(e);
    }
}
exports.getDepartmentById = async (req, res, next) => {
    try {
        const result = await departmentSevice.getDepartmentById(req.params);
        res.status(StatusCodes.OK).json({
            success: true,
            data: result
        })
    } catch (e) {
        next(e);
    }
}
