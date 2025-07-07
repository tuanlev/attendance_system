const ErrorCustom = require("../errorcustom/ErrorCustom");

exports.errorHandling = (err, req, res, next) => {
    res.status((err instanceof ErrorCustom) ? err.status : 500).json({
        success: false,
        error: err.message
    });
};