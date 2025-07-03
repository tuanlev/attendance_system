const departmentSevice = require('../service/DepartmentService')
const { StatusCodes } = require('http-status-codes');
exports.addDepartment = async (req, res, next) => {
    try {
        const result = await departmentSevice.addDepartment(req.body);
        res.status(StatusCodes.OK).json({
            success:true,
            data:result
        })
    } catch (e) {
        next(e);
    }
}
exports.getDepartments = async(req, res, next) => {
     try {
        const result = await departmentSevice.getDepartments(req.query);
        res.status(StatusCodes.OK).json({
            success:true,
            data:result
        })
    } catch (e) {
        next(e);
    }
}