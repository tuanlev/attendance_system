const { passwordEncoder } = require("../security/PasswordHashing");

exports.LoadSystemUserByUsername = (username) => {
    if (!username) throw new Error('username is required'); 
    if (!process.env.SUPERADMIN_USERNAME || process.env.SUPERADMIN_USERNAME !=username ) throw new Error('SystemUser not exists'); 
    return {
        username : process.env.SUPERADMIN_USERNAME,
        password: passwordEncoder(process.env.SUPERADMIN_PASSWORD)
    }
}