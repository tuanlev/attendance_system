const jwtUtils = require("../security/JwtUtils");
const userService = require("../service/UserServiceCustom")
const systemUser = require("../config/SystemUser")
exports.tokenAuthorizationLocalSuperadmin = async (req, res, next) => {
    let token = req.get("Authorization");
    if (token) {
        try {
            const user = jwtUtils.jwtDecoder(token);
            console.log(user,'hi')
            if (user.role == jwtUtils.Option.SUPDERADMIN) {
                const userExist = systemUser.LoadSystemUserByUsername(user.username);
                if (userExist?.username) {
                    res.set('Authorization', jwtUtils.jwtEncoder(user, jwtUtils.Option.SUPDERADMIN));
                    req.isAuthenticated = true;
                    req.role = user.role;
                }
                else {
                    req.isAuthenticated = false;
                }
            }
        } catch (e) {
            req.isAuthenticated = false;

            console.log("middleware 2" + e.message)
        }
    }
    else
        req.isAuthenticated = false;
    next()
}