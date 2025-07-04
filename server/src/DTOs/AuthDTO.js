const { createErrorDto } = require('./ErrorDTOPattern');
const PasswordHasing = require('../security/PasswordHashing')

// DTO cho đăng nhập
exports.loginQuery = ({ username, password }) => {
    if (!username || !username.toString().trim()) {
        throw createErrorDto('username');
    }
    if (!password || !password.toString().trim()) {
        throw createErrorDto('password');
    }
    return {
        username: username.toString().trim(),
        password: PasswordHasing.passwordEncoder(password.toString().trim())
    };
};

// DTO cho đăng ký
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

// Response cho auth (ví dụ trả về token)
exports.authResponse = ({ username, role}) => {
    return { username, role:(role)?role:'superadmin'};
};