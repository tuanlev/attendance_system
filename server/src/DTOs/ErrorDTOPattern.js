const ErrorHandling = require("../ErrorHandling/ErrorHandling");
const { ReasonPhrases, StatusCodes } = require('http-status-codes');
exports.createErrorDto = (field) => new ErrorHandling(StatusCodes.BAD_REQUEST, `${field} is required`);
