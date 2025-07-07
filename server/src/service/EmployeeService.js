const employeeDTO = require('../DTOs/EmployeeDTO');
const employeeRepository = require('../repositories/EmployeeRepository');
const { StatusCodes } = require('http-status-codes');
const ErrorCustom = require('../errorcustom/ErrorCustom');
// done
exports.createEmployee = async (employee,device_id) => {
    const query = employeeDTO.employeeQuery({ ...searchParams, device_id:device_id });
    const created = await employeeRepository.createEmployee(query);
    return employeeDTO.employeeResponse(created);
}

// done
exports.getEmployees = async (searchParams, device_id) => {
    // employeeSearchQuery sẽ chuẩn hóa các điều kiện tìm kiếm
    const query = employeeDTO.employeeSearchQuery({ ...searchParams, device_id:device_id });
    const employees = await employeeRepository.getEmployees(query, device_id);
    return employees.map(employeeDTO.employeeResponse);
};

// done
exports.getEmployeeById = async ( employee_id , device_id) => {
    if (employee_id === undefined || employee_id === null)
        throw new ErrorCustom(StatusCodes.BAD_REQUEST, "employee_id is required");
    const employee = await employeeRepository.findEmployeeById(employee_id, device_id);
    if (!employee)
        throw new ErrorCustom(StatusCodes.NOT_FOUND, "Employee not found on this device");
    return employeeDTO.employeeResponse(employee);
};

// Lấy employee theo external_id
exports.getEmployeeByExternalId = async ({ external_id }, device_id) => {
    if (!external_id)
        throw new ErrorCustom(StatusCodes.BAD_REQUEST, "external_id is required");
    const employee = await employeeRepository.findEmployeeByExternalId(external_id, device_id);
    if (!employee)
        throw new ErrorCustom(StatusCodes.NOT_FOUND, "Employee not found on this device");
    return employeeDTO.employeeResponse(employee);
};

// done
exports.deleteEmployeeById = async ({ employee_id }, device_id) => {
    if (employee_id === undefined || employee_id === null)
        throw new ErrorCustom(StatusCodes.BAD_REQUEST, "employee_id is required");
    return await employeeRepository.deleteEmployeeById(employee_id, device_id);
};
// for mqtt
exports.editEmployee = async (data) => {
    return await employeeRepository.editEmployee(data);
}
//done
exports.deleteEmployeeByExternal_id = async (id) => {
    return await employeeRepository.deleteEmployeeByExternal_id(id);
}
//done
exports.addEmployee = async (employeeQuery, data) => {
    // employeeQuery sẽ kiểm tra và chuẩn hóa dữ liệu đầu vào
    const created = await employeeRepository.createEmployee(employeeData);
    return employeeDTO.employeeResponse(created);
};
