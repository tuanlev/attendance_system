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


// Response cho auth (ví dụ trả về token)
exports.authResponse = ({ username, role}) => {
    return { username, role:(role)?role:'superadmin'};
};