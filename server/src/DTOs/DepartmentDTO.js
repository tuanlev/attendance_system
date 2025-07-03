const Department = require('../model/Department');
const { createErrorDto } = require('./ErrorDTOPattern');
const { StatusCodes } = require('http-status-codes');

exports.departmentQuery = ({ name }) => {
    if (!name || !name.toString().trim()) {
        throw createErrorDto('department name');
    }
    return { name: name.toString().trim() };
};
exports.departmentResponse = ({ id, name, updated_at })=> {
    return { id, name, updated_at };
}