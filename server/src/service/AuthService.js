const systemUser = require("../config/SystemUser");

const authDTO =require('../DTOs/AuthDTO');
const { passwordVerifier } = require('../security/PasswordHashing');
const ErrorHandling = require('../ErrorHandling/ErrorHandling');
exports.login = async (loginInfo) => {
    const loginData = authDTO.loginQuery(loginInfo);
    const user = systemUser.LoadSystemUserByUsername(loginData.username);
    if (!user || !passwordVerifier(loginData.password, user.password)) {
        throw new ErrorHandling(401, "Username or password is incorrect");
    }
    return authDTO.authResponse(user);
};