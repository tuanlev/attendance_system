const userDTO = require('../DTOs/UserDTO');
const authDTO = require('../DTOs/AuthDTO');

const userRepository = require('../repositories/UserRepository')
const { passwordVerifier } = require('../security/PasswordHashing');
const ErrorHandling = require('../ErrorHandling/ErrorHandling');

exports.loadUserByName = async (username) => {
    if (!username) throw new ErrorHandling(401, "Username not found");

    return await userRepository.findUserByUsername(username);
}

exports.login = async (loginInfo) => {
    const loginData = authDTO.loginQuery(loginInfo);
    const user = await this.loadUserByName(loginData.username);
    if (!user || !passwordVerifier(loginData.password, user.password)) {
        throw new ErrorHandling(401, "Username or password is incorrect");
    }
    return userDTO.userResponse(user);
};
exports.register = async (registerInfo) => {
    const registerData = userDTO.registerQuery(registerInfo);
        console.log(registerData)

    const user = await userRepository.createUser(registerData);
    return userDTO.userResponse(user);
};
exports.getUsers = async ({ keyword }) => {
    const users = await userRepository.getUsers(keyword);
    return users.map(userDTO.userResponse);
};
exports.getUserById = async ({ user_id }) => {
    const user = await userRepository.findUserById(user_id);
    return userDTO.userResponse(user);
}
exports.deleteUserById = async ({ user_id }) => {

    return await userRepository.deleteUserById(user_id);;
}