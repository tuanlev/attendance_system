const ErorrHandling = require("../ErrorHandling/ErrorHandling")

exports.errorHandling = async (err, req, res,next) => {
    res.status((err instanceof ErorrHandling)?err.status:500).json({
            success: false,
            error:err.message
        });
}