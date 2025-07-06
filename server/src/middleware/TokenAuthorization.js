const jwtUtils = require("../security/JwtUtils");
const userService = require("../service/UserServiceCustom")
const systemUser = require("../config/SystemUser")
exports.tokenAuthorization = async (req, res, next) => {
    let token = req.get("Authorization");
    if (token) {
        try {
            const user = jwtUtils.jwtDecoder(token);
            if (user.role == jwtUtils.Option.SUPDERADMIN) {
                res.set('Authorization', jwtUtils.jwtEncoder(user, jwtUtils.Option.SUPDERADMIN));
                req.isAuthenticated = true;
                req.grantedAuthority = user.role;
            }
            else {
                res.set('Authorization', jwtUtils.jwtEncoder(user, jwtUtils.Option.ADMIN));
                req.isAuthenticated = true;
                req.grantedAuthority = user.role;
                req.device_id = user.device_id;
            }
        }catch (e) {
        req.isAuthenticated = false;
        console.log("middleware 2" + e.message)
        }
        } 
    else
    req.isAuthenticated = false;
    console.log(req.grantedAuthority)
    next()
}