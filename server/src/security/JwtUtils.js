const Jwt = require("jsonwebtoken");
const ErrorSecurityPattern = require("./ErrorSecurityPattern");
exports.Option = {
    ADMIN: 1,
    SUPDERADMIN: 0
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
            deviceId: data.deviceId
        } : {
            role: data.role,
            username: data.username
        }
    } catch (e) {
        throw ErrorSecurityPattern.unauthorizedError(e.message);

    }
}
exports.jwtEncoder = ({ deviceId, username }, options = this.Option.ADMIN) => {
    const data = {};
    data.username = username;
    data.role = (options==this.Option.ADMIN)?'admin':'superadmin';
    if (deviceId != undefined && options == this.Option.ADMIN) data.deviceId = deviceId;

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
