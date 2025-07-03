const ErrorHandling = require("../ErrorHandling/ErrorHandling");
const { ReasonPhrases, StatusCodes } = require('http-status-codes');
exports.createErrorDto(StatusCodes.BAD_REQUEST, `${field} is required`);
