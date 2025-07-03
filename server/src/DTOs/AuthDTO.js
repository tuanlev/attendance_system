const { createErrorDto } = require('./ErrorDTOPattern');

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
        password: password.toString().trim()
    };
};

// DTO cho đăng ký
exports.registerQuery = ({ username, password, device_id, employee_id }) => {
    if (!username || !username.toString().trim()) {
        throw createErrorDto('username');
    }
    if (!password || !password.toString().trim()) {
        throw createErrorDto('password');
    }
    // Có thể kiểm tra device_id, employee_id nếu cần
    return {
        username: username.toString().trim(),
        password: password.toString().trim(),
        device_id,
        employee_id
    };
};

// Response cho auth (ví dụ trả về token)
exports.authResponse = ({ id, username, token }) => {
    return { id, username, token };
};