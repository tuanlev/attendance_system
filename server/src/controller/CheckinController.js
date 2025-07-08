const { getCheckins } = require("../service/CheckinService");
const { ReasonPhrases, StatusCodes } = require('http-status-codes');

exports.getCheckins = async (req, res, next) => {
 try {
         if (!req.isAuthenticated || req.grantedAuthority !=  require("../security/JwtUtils").Option.ADMIN)
            throw new ErrorCustom(403, "You do not have permission");
         if (!req.access) throw new ErrorCustom(403, "You do not have role in any device");
        const result = await getCheckins(req.query,req.access);
        res.status(StatusCodes.OK).json({
            success: true,
            data: result
        })
    } catch (e) {
        next(e);
    }
}
