const departmentDTO = require('../DTOs/DepartmentDTO')
const departmentRepository = require('../repositories/DepartmentRepository')
//arg thường là cả req.body
exports.addDepartment = async (department) => {
    //departmentQuery sẽ lấy những trường cần thiết trong req.body để truyền vào
    return departmentDTO.departmentResponse(await departmentRepository.createDepartment(departmentDTO.departmentQuery(department)));
}
//arg là req.query
exports.getDepartments = async ({keyword}) =>  {
    return await departmentRepository.getDepartments((keyword)?keyword:null).map(r => departmentDTO.departmentResponse(r));
}
