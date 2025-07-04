const User = require('../model/User');
const { createErrorDto } = require('./ErrorDTOPattern');
const PasswordHasing = require('../security/PasswordHashing')
exports.userResponse = ({ id, username, device_id, updated_at }) => {
    return {
        id: id !== undefined ? Number(id) : undefined,
        username,
        device_id,
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
    device_id = (device_id)?device_id:null;
    // Có thể kiểm tra device_id, employee_id nếu cần
    return {
        username: username.toString().trim(),
        password: PasswordHasing.passwordEncoder(password.toString().trim()),
        device_id
    };
};