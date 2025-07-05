const employeeDTO = require('../DTOs/EmployeeDTO');
const employeeRepository = require('../repositories/EmployeeRepository');
const { StatusCodes } = require('http-status-codes');
const ErrorHandling = require('../ErrorHandling/ErrorHandling');

// Thêm employee mới
exports.addEmployee = async (employee, device_id) => {
    // employeeQuery sẽ kiểm tra và chuẩn hóa dữ liệu đầu vào
    const employeeData = employeeDTO.employeeQuery({ ...employee, device_id });
    const created = await employeeRepository.createEmployee(employeeData, device_id);
    return employeeDTO.employeeResponse(created);
};

// Lấy danh sách employees (có thể tìm kiếm theo tên, phòng ban, vị trí)
exports.getEmployees = async (searchParams, device_id) => {
    // employeeSearchQuery sẽ chuẩn hóa các điều kiện tìm kiếm
    const query = employeeDTO.employeeSearchQuery({ ...searchParams, device_id });
    const employees = await employeeRepository.getEmployees(query, device_id);
    return employees.map(employeeDTO.employeeResponse);
};

// Lấy employee theo id
exports.getEmployeeById = async ({ employeeId }, device_id) => {
    if (employeeId === undefined || employeeId === null)
        throw new ErrorHandling(StatusCodes.BAD_REQUEST, "employeeId is required");
    const employee = await employeeRepository.findEmployeeById(employeeId, device_id);
    if (!employee)
        throw new ErrorHandling(StatusCodes.NOT_FOUND, "Employee not found on this device");
    return employeeDTO.employeeResponse(employee);
};

// Lấy employee theo external_id
exports.getEmployeeByExternalId = async ({ external_id }, device_id) => {
    if (!external_id)
        throw new ErrorHandling(StatusCodes.BAD_REQUEST, "external_id is required");
    const employee = await employeeRepository.findEmployeeByExternalId(external_id, device_id);
    if (!employee)
        throw new ErrorHandling(StatusCodes.NOT_FOUND, "Employee not found on this device");
    return employeeDTO.employeeResponse(employee);
};

// Cập nhật employee theo id
exports.updateEmployeeById = async ({ employeeId }, employee, device_id) => {
    if (employeeId === undefined || employeeId === null)
        throw new ErrorHandling(StatusCodes.BAD_REQUEST, "employeeId is required");
    const employeeData = employeeDTO.employeeQuery({ ...employee, device_id });
    const updated = await employeeRepository.updateEmployeeById(employeeId, employeeData, device_id);
    return employeeDTO.employeeResponse(updated);
};

// Xóa employee theo id
exports.deleteEmployeeById = async ({ employeeId }, device_id) => {
    if (employeeId === undefined || employeeId === null)
        throw new ErrorHandling(StatusCodes.BAD_REQUEST, "employeeId is required");
    return await employeeRepository.deleteEmployeeById(employeeId, device_id);
};