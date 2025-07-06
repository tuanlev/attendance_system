const employeeDTO = require('../DTOs/EmployeeDTO');
const employeeRepository = require('../repositories/EmployeeRepository');
const { StatusCodes } = require('http-status-codes');
const ErrorHandling = require('../ErrorHandling/ErrorHandling');

// Thêm employee mới
exports.addEmployee = async (employee, device_id) => {
    // employeeQuery sẽ kiểm tra và chuẩn hóa dữ liệu đầu vào
    if (!device_id) throw new Error('you dont have role in any device')
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
exports.getEmployeeById = async ({ employee_id }, device_id) => {
    if (employee_id === undefined || employee_id === null)
        throw new ErrorHandling(StatusCodes.BAD_REQUEST, "employee_id is required");
    const employee = await employeeRepository.findEmployeeById(employee_id, device_id);
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
exports.updateEmployeeById = async ({ employee_id }, employee, device_id) => {
    if (employee_id === undefined || employee_id === null)
        throw new ErrorHandling(StatusCodes.BAD_REQUEST, "employee_id is required");
    const employeeData = employeeDTO.employeeQuery({ ...employee, device_id });
    const updated = await employeeRepository.updateEmployeeById(employee_id, employeeData, device_id);
    return employeeDTO.employeeResponse(updated);
};

// Xóa employee theo id
exports.deleteEmployeeById = async ({ employee_id }, device_id) => {
    if (employee_id === undefined || employee_id === null)
        throw new ErrorHandling(StatusCodes.BAD_REQUEST, "employee_id is required");
    return await employeeRepository.deleteEmployeeById(employee_id, device_id);
};