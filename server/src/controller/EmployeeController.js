const EmployeeService = require('../service/EmployeeService');
const { StatusCodes } = require('http-status-codes');
const ErrorCustom = require('../errorcustom/ErrorCustom');
const { getDeviceById } = require('../service/DeviceService');
const { employeeBody } = require('../DTOs/EmployeeDTO');
exports.addEmployee = async (req, res, next) => {
    try {
        if (!req.isAuthenticated || req.grantedAuthority != require("../security/JwtUtils").Option.ADMIN)
            throw new ErrorCustom(403, "You do not have permission");
        if (!req.access) throw new Error("no device found")

        const data = await EmployeeService.createEmployee(employeeBody( req.body), req.access);
        res.status(StatusCodes.CREATED).json({
            success: true,
            data
        });
    } catch (e) {
        next(e);
    }
};

// Lấy danh sách employees (có thể tìm kiếm theo tên, phòng ban, vị trí)
exports.getEmployees = async (req, res, next) => {
    try {
        if (!req.isAuthenticated || req.grantedAuthority != require("../security/JwtUtils").Option.ADMIN)
            throw new ErrorCustom(403, "You do not have permission");
        if (!req.access) throw new Error("no device found")
        const data = await EmployeeService.getEmployees(req.query, req.access);
        res.status(StatusCodes.OK).json({
            success: true,
            data
        });
    } catch (e) {
        next(e);
    }
};

// Lấy employee theo id
exports.getEmployeeById = async (req, res, next) => {
    try {
        if (!req.isAuthenticated || req.grantedAuthority != require("../security/JwtUtils").Option.ADMIN)
            throw new ErrorCustom(403, "You do not have permission");
        if (!req.access) throw new Error("no device found")
        const data = await EmployeeService.getEmployeeById(req.params.employee_id, req.access);
        res.status(StatusCodes.OK).json({
            success: true,
            data
        });
    } catch (e) {
        next(e);
    }
};

// Lấy employee theo external_id
exports.getEmployeeByExternalId = async (req, res, next) => {
    try {
        if (!req.isAuthenticated || req.grantedAuthority != require("../security/JwtUtils").Option.ADMIN)
            throw new ErrorCustom(403, "You do not have permission");
        if (!req.access) throw new Error("no device found")

        const data = await EmployeeService.getEmployeeByExternalId({ external_id: req.params.external_id }, req.access);
        res.status(StatusCodes.OK).json({
            success: true,
            data
        });
    } catch (e) {
        next(e);
    }
};

// Cập nhật employee theo id
exports.updateEmployeeById = async (req, res, next) => {
    try {
        if (!req.isAuthenticated || req.grantedAuthority != require("../security/JwtUtils").Option.ADMIN)
            throw new ErrorCustom(403, "You do not have permission");
        if (!req.access) throw new Error("no device found")
        if (!req.params.employee_id) throw new Error("no employee_id found")
        const data = await EmployeeService.updateEmployeeById(req.params.employee_id, { ...employeeBody( req.body) , device_id: req.access });
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Update successful",
            data
        });
    } catch (e) {
        next(e);
    }
};

// Xóa employee theo id
exports.deleteEmployeeById = async (req, res, next) => {
    try {
        if (!req.isAuthenticated || req.grantedAuthority != require("../security/JwtUtils").Option.ADMIN)
            throw new ErrorCustom(403, "You do not have permission");
        if (!req.access) throw new Error("no device found")

        const result = await EmployeeService.deleteEmployeeById({ employee_id: req.params.employee_id }, req.access);
        res.status(StatusCodes.OK).json({
            success: true,
            ...result
        });
    } catch (e) {
        next(e);
    }
};

exports.addShiftByDepartment = async (req, res, next) => {
    try {
        if (!req.isAuthenticated || req.grantedAuthority != require("../security/JwtUtils").Option.ADMIN)
            throw new ErrorCustom(403, "You do not have permission");
        if (!req.access) throw new Error("no device found")
        if (!req.params.department_id) throw new Error("no department_id found")
        const data = await EmployeeService.addShiftForEmployeeByDepartment(req.params, req.body ,req.access );
        res.status(StatusCodes.OK).json({
            success: true,
            message: "add shift successful",
            data
        });
    } catch (e) {
        next(e);
    }
};
exports.addShiftByPosition = async (req, res, next) => {
    try {
        if (!req.isAuthenticated || req.grantedAuthority != require("../security/JwtUtils").Option.ADMIN)
            throw new ErrorCustom(403, "You do not have permission");
        if (!req.access) throw new Error("no device found")
        if (!req.params.position_id) throw new Error("no position_id found")
        const data = await EmployeeService.addShiftForEmployeeByPosition(req.params, req.body ,req.access );
        res.status(StatusCodes.OK).json({
            success: true,
            message: "add shift successful",
            data
        });
    } catch (e) {
        next(e);
    }
};