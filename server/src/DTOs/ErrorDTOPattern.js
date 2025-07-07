const ErrorCustom = require("../errorcustom/ErrorCustom");
const { ReasonPhrases, StatusCodes } = require('http-status-codes');
exports.createErrorDto = (field) => new ErrorCustom(StatusCodes.BAD_REQUEST, `${field} is required`);
