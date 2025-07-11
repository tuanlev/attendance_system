const jwtUtils = require("../security/JwtUtils");
const authService = require("../service/AuthService")
const userService = require("../service/UserServiceCustom");
const ErrorCustom = require("../errorcustom/ErrorCustom");

exports.login = async (req, res, next) => {
    try {
        const data = await userService.login(req.body);
        res.set('Authorization', await jwtUtils.jwtEncoder(data, jwtUtils.Option.ADMIN));
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
        if (!req.isAuthenticated || req.grantedAuthority != jwtUtils.Option.SUPDERADMIN)
            throw new ErrorCustom(403, "You do not have permission to register a user");
        const data = await userService.register(req.body);
        res.status(201).json({
            success: true,
            data: data
        })
    } catch (e) {
        next(e)
    }
}
exports.getUsers =  async (req, res, next) => {
    try {
        if (!req.isAuthenticated || req.grantedAuthority != jwtUtils.Option.SUPDERADMIN)
            throw new ErrorCustom(403, "You do not have permission to get users");
        const data = await userService.getUsers(req.query);
        res.status(200).json({
            success: true,
            data: data
        })
    } catch (e) {
        next(e)
    }
}
exports.resetPasswordUsers = async (req, res ,next) => {
     try {
        if (!req.isAuthenticated || req.grantedAuthority != jwtUtils.Option.SUPDERADMIN)
            throw new ErrorCustom(403, "You do not have permission");
        const data = await userService.resetPasswordUsersById(req.params);
        res.status(200).json({
            success: true,
            data: data
        })
    } catch (e) {
        next(e)
    }
}
exports.changeDeviceUser = async (req, res ,next) => {
     try {
        if (!req.isAuthenticated || req.grantedAuthority != jwtUtils.Option.SUPDERADMIN)
            throw new ErrorCustom(403, "You do not have permission");
        const data = await userService.changeDeviceUser(req.params,req.body);
        res.status(200).json({
            success: true,
            data: data
        })
    } catch (e) {
        next(e)
    }
}
exports.deleteUser = async (req, res ,next) => {
     try {
        if (!req.isAuthenticated || req.grantedAuthority != jwtUtils.Option.SUPDERADMIN)
            throw new ErrorCustom(403, "You do not have permission");
        const data = await userService.deleteUserById(req.params);
        res.status(200).json({
            success: true,
            data: data
        })
    } catch (e) {
        next(e)
    }
}