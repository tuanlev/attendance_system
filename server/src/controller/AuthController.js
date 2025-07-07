const jwtUtils = require("../security/JwtUtils");
const authService = require("../service/AuthService")
const SystemUser = require("../config/SystemUser");
const ErrorCustom = require("../errorcustom/ErrorCustom");

exports.login =async (req, res, next) => {
    try {
        const data = await authService.login(req.body);
        res.set('Authorization', await jwtUtils.jwtEncoder(data, jwtUtils.Option.SUPDERADMIN));
        res.status(200).json({
            success: true,
            data:data
        })
    } catch (e) {
        next(e)
    }
}