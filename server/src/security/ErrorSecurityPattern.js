const ErrorCustom = require("../errorcustom/ErrorCustom");
const { ReasonPhrases, StatusCodes } = require('http-status-codes');

exports.unauthorizedError = (message="Unauthorized") => {
    return new ErrorCustom(
        StatusCodes.UNAUTHORIZED,
        message
        
    );
};
exports.forbiddenError = (message="Forbidden") => {
    return new ErrorCustom(
        StatusCodes.FORBIDDEN,
        message
        
    );
};