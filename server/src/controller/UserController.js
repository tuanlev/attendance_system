const jwtUtils = require("../security/JwtUtils");
const authService = require("../service/AuthService")
const userService = require("../service/UserServiceCustom");
const ErrorHandling = require("../ErrorHandling/ErrorHandling");

exports.login = async (req, res, next) => {
    try {
        const data = await userService.login(req.body);
        res.set('Authorization', jwtUtils.jwtEncoder(data, jwtUtils.Option.SUPDERADMIN));
        res.status(200).json({
            success: true,
            data: data
        })
    } catch (e) {
        next(e)
    }
}
exports.register = async (req, res, next) => {
    try {
        if (!req.isAuthenticated && req.role != jwtUtils.Option.SUPDERADMIN)
            throw new ErrorHandling(403, "You do not have permission to register a user");
        const data = await userService.register(req.body);
        res.status(201).json({
            success: true,
            data: data
        })
    } catch (e) {
        next(e)
    }
}
