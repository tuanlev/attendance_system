const jwtUtils = require("../security/JwtUtils");
const userService = require("../service/UserServiceCustom")
const systemUser = require("../config/SystemUser")
exports.tokenAuthorizationLocalSuperadmin = async (req, res, next) => {
    let token = req.get("Authorization");
    if (token) {
        try {
            const user = jwtUtils.jwtDecoder(token);
            if (user.role == jwtUtils.Option.ADMIN) {
                const userExist = await userService.loadUserByName(user.username);
                if (userExist?.username) {
                    res.set('Authorization', jwtUtils.jwtEncoder(user, jwtUtils.Option.ADMIN));
                    req.isAuthenticated = true;
                    req.role = user.role;
                    req.grantedAuthority = user.device_id;
                    console.log(userExist)
                }
                else {
                    req.isAuthenticated = false;

                }
            }
        } catch (e) {
            console.log("middleware" + e.message)
        }
    }
    else
        req.isAuthenticated = false;
    next()
}