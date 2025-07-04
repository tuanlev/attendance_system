const ErrorHandling = require("../ErrorHandling/ErrorHandling");

exports.errorHandling = (err, req, res, next) => {
    res.status((err instanceof ErrorHandling) ? err.status : 500).json({
        success: false,
        error: err.message
    });
};