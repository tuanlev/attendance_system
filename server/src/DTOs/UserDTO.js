const User = require('../model/User');
const { createErrorDto } = require('./ErrorDTOPattern');
const PasswordHasing = require('../security/PasswordHashing')
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
        password: PasswordHasing.passwordEncoder(password.toString().trim()),
        device_id: device_id !== undefined ? Number(device_id) : undefined,
        employee_id: employee_id !== undefined ? Number(employee_id) : undefined
    };
};

exports.userResponse = ({ id, username, device_id, employee_id, updated_at }) => {
    return {
        id: id !== undefined ? Number(id) : undefined,
        username,
        device_id: device_id !== undefined ? Number(device_id) : undefined,
        employee_id: employee_id !== undefined ? Number(employee_id) : undefined,
        updated_at
    };
};
exports.registerQuery = ({ username, password, device_id }) => {
    if (!username || !username.toString().trim()) {
        throw createErrorDto('username');
    }
    if (!password || !password.toString().trim()) {
        throw createErrorDto('password');
    }
    // Có thể kiểm tra device_id, employee_id nếu cần
    return {
        username: username.toString().trim(),
        password: PasswordHasing.passwordEncoder(password.toString().trim()),
        device_id,
        employee_id
    };
};