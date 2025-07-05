const jwtUtils = require("../security/JwtUtils");
const userService = require("../service/UserServiceCustom")
exports.tokenAuthorization = async (req, res, next) => {
    let token = req.get("Authorization");
    if (token) {
        try {
            const user = jwtUtils.jwtDecoder(token);
            console.log(user)
            if (user.role == jwtUtils.Option.ADMIN) {
                const userExist = await userService.loadUserByName(user.username);
                if (userExist?.username) {
                    res.set('Authorization', jwtUtils.jwtEncoder(user, jwtUtils.Option.ADMIN));
                    req.isAuthenticated = true;
                    req.role = user.role;
                    req.grantedAuthority = user.device_id;
                }
                else {
                    req.isAuthenticated = false;

                }
            }
        } catch (e) {
            console.log("middleware 1" + e.message)
        }
    }
    else
        req.isAuthenticated = false;
    next()
}