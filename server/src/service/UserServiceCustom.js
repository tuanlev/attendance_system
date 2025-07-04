const userRepository = require('../repositories/UserRepository')
exports.loadUserByName = async (username) => {
    if (!username) throw new Error() 
    return await userRepository.findUserByUsername(username);
}