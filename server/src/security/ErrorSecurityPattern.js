const ErrorHandling = require("../ErrorHandling/ErrorHandling");
const { ReasonPhrases, StatusCodes } = require('http-status-codes');

exports.unauthorizedError = (message="Unauthorized") => {
    return new ErrorHandling(
        StatusCodes.UNAUTHORIZED,
        message
        
    );
};
exports.forbiddenError = (message="Forbidden") => {
    return new ErrorHandling(
        StatusCodes.FORBIDDEN,
        message
        
    );
};