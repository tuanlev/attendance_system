const EmployeeService = require('../service/EmployeeService');
const { StatusCodes } = require('http-status-codes');
const ErrorHandling = require('../ErrorHandling/ErrorHandling');

const DEFAULT_DEVICE_ID = 5;

// Thêm employee mới
exports.addEmployee = async (req, res, next) => {
    try {
        if (!req.isAuthenticated && req.role != require("../security/JwtUtils").Option.ADMIN)
            throw new ErrorHandling(403, "You do not have permission");
        const data = await EmployeeService.addEmployee(req.body, req.grantedAuthority
        );
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
         if (!req.isAuthenticated && req.role != require("../security/JwtUtils").Option.ADMIN)
            throw new ErrorHandling(403, "You do not have permission");
        const data = await EmployeeService.getEmployees(req.query, req.grantedAuthority);
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
         if (!req.isAuthenticated && req.role != require("../security/JwtUtils").Option.ADMIN)
            throw new ErrorHandling(403, "You do not have permission");
        const data = await EmployeeService.getEmployeeById({ employeeId: req.params.employeeId }, req.grantedAuthority);
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
         if (!req.isAuthenticated && req.role != require("../security/JwtUtils").Option.ADMIN)
            throw new ErrorHandling(403, "You do not have permission");
        const data = await EmployeeService.getEmployeeByExternalId({ external_id: req.params.external_id }, req.grantedAuthority);
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
         if (!req.isAuthenticated && req.role != require("../security/JwtUtils").Option.ADMIN)
            throw new ErrorHandling(403, "You do not have permission");
        const data = await EmployeeService.updateEmployeeById({ employeeId: req.params.employeeId }, req.body, req.grantedAuthority);
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
         if (!req.isAuthenticated && req.role != require("../security/JwtUtils").Option.ADMIN)
            throw new ErrorHandling(403, "You do not have permission");
        const result = await EmployeeService.deleteEmployeeById({ employeeId: req.params.employeeId }, req.grantedAuthority);
        res.status(StatusCodes.OK).json({
            success: true,
            ...result
        });
    } catch (e) {
        next(e);
    }
};