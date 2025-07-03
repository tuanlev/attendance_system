const User = require('../model/User');
const { createErrorDto } = require('./ErrorDTOPattern');
const { StatusCodes } = require('http-status-codes');

exports.userQuery = ({ username, password, device_id, employee_id }) => {
    if (!username || !username.toString().trim()) {
        throw createErrorDto('username');
    }
    if (!password || !password.toString().trim()) {
        throw createErrorDto('password');
    }
    // device_id và employee_id có thể kiểm tra thêm nếu cần
    return {
        username: username.toString().trim(),
        password: password.toString().trim(),
        device_id,
        employee_id
    };
};

exports.userResponse = ({ id, username, device_id, employee_id, updated_at }) => {
    return { id, username, device_id, employee_id, updated_at };
};