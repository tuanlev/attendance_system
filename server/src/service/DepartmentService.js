const departmentDTO = require('../DTOs/DepartmentDTO');
const { errorHandling } = require('../middleware/ErrorHandling');
const departmentRepository = require('../repositories/DepartmentRepository')
const { StatusCodes } = require('http-status-codes');

//arg thường là cả req.body
exports.addDepartment = async (department) => {
    //departmentQuery sẽ lấy những trường cần thiết trong req.body để truyền vào
    return departmentDTO.departmentResponse(await departmentRepository.createDepartment(departmentDTO.departmentQuery(department)));

}
//arg là req.query
exports.getDepartments = async ({ keyword }) => {
    return (await departmentRepository.getDepartments((keyword) ? keyword : null)).map(r => departmentDTO.departmentResponse(r));
}

//arg là (req.params, req.body)
exports.updateDepartmentById = async ({ departmentId }, department) => {
    if (departmentId === undefined || departmentId === null)
        throw new errorHandling(StatusCodes.BAD_REQUEST, "departmentId is required");
    return departmentDTO.departmentResponse(await departmentRepository.updateDepartmentById(departmentId, departmentDTO.departmentQuery(department)));
} 
exports.getDepartmentById = async ({ departmentId }) => {
    if (departmentId === undefined || departmentId === null)
        throw new errorHandling(StatusCodes.BAD_REQUEST, "departmentId is required");
    return departmentDTO.departmentResponse(await departmentRepository.findDepartmentById(departmentId));
} 
exports.deleteDepartmentById = async ({ departmentId }) => {
    if (departmentId === undefined || departmentId === null)
        throw new errorHandling(StatusCodes.BAD_REQUEST, "departmentId is required");
    return departmentDTO.departmentResponse(await departmentRepository.deleteDepartmentById(departmentId));
} 