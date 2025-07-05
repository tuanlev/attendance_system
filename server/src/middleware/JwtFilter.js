const jwtUtils = require("../security/JwtUtils");
const userService = require("../service/UserServiceCustom")
const SystemUser = require("../config/SystemUser");
const { loginQuery } = require("../DTOs/AuthDTO");
exports.JwtFilter = async (req, res, next) => {
    try {
        const loginQuery = loginQuery(req.body) 
    } catch (e) {
        console.log(e.message);
        next();
    }
    if (token) {
        try {
            const user = jwtUtils.jwtDecoder(token);
            if (user.role == jwtUtils.Option.ADMIN) {
                const userExist = userService.loadUserByName(user.username);
                if (userExist?.username) {
                    res.set('Authorization', jwtUtils.jwtEncoder(user, jwtUtils.Option.ADMIN));
                    req.isAuthenticated = true;
                    req.role = jwtUtils.Option.ADMIN
                    req.grantedAuthority = user.device_id;
                    next()
                }
                else {
                    throw new Error('user not found')
                }
            }
            else {
                const userExist = SystemUser.LoadSystemUserByUsername(user.username);
                if (userExist?.username) {
                    res.set('Authorization', jwtUtils.jwtEncoder(user, jwtUtils.Option.SUPDERADMIN));
                    req.isAuthenticated = true;
                    req.role = jwtUtils.Option.SUPDERADMIN
                    next()
                }
            }
        } catch (e) {
            console.log(e.message)
        }
    }
    req.isAuthenticated = false;
    next()
}