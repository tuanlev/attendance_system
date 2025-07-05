const Jwt = require("jsonwebtoken");
const ErrorSecurityPattern = require("./ErrorSecurityPattern");
exports.Option = {
    ADMIN: 'admin',
    SUPDERADMIN: 'superadmin'
}
exports.jwtDecoder = (token) => {
    if (!token) {
        throw ErrorSecurityPattern.unauthorizedError("No token provided");
    }
    try {
        token = token.toString().replace("Bearer ", ""); // Remove 'Bearer ' prefix if present
        const secretKey = process.env.JWT_SECRET;
        const data = Jwt.verify(token, secretKey);
        return (data.role == this.Option.ADMIN) ? {
            role: data.role,
            username: data.username,
            device_id: data.device_id
        } : {
            role: data.role,
            username: data.username
        }
    } catch (e) {
        throw ErrorSecurityPattern.unauthorizedError(e.message);

    }
}
exports.jwtEncoder = ({ device_id, username }, options = this.Option.ADMIN) => {
    const data = {};
    data.username = username;
    data.role = (options==this.Option.ADMIN)?options:this.Option.SUPDERADMIN;
    if (device_id != undefined && options == this.Option.ADMIN) data.device_id = device_id;
    try {
        const token = Jwt.sign(data, process.env.JWT_SECRET, {
            expiresIn: '30minutes' // Token will expire in 30 minutes
        })
        return "Bearer " + token;
    }
    catch (e) {
        throw ErrorSecurityPattern.unauthorizedError(e.message);
    }
}
