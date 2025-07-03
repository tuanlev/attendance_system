const Position = require('../model/Position');
const { createErrorDto } = require('./ErrorDTOPattern');
const { StatusCodes } = require('http-status-codes');

exports.positionQuery = ({ name }) => {
    if (!name || !name.toString().trim()) {
        throw createErrorDto('position name');
    }
    return { name: name.toString().trim() };
};
exports.positionResponse = ({ id, name, updated_at })=> {
    return { id, name, updated_at };
}