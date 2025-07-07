const systemUser = require("../config/SystemUser");

const authDTO =require('../DTOs/AuthDTO');
const { passwordVerifier } = require('../security/PasswordHashing');
const ErrorCustom = require('../errorcustom/ErrorCustom');
exports.login = async (loginInfo) => {
    const loginData = authDTO.loginQuery(loginInfo);
    const user = await systemUser.LoadSystemUserByUsername(loginData.username);
    if (!user || !passwordVerifier(loginData.password, user.password)) {
        throw new ErrorCustom(401, "Username or password is incorrect");
    }
    console.log(user);
    return authDTO.authResponse(user);
};