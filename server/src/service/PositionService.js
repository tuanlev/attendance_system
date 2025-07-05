const positionDTO = require('../DTOs/PositionDTO');
const ErrorHandling = require('../ErrorHandling/ErrorHandling');
const { StatusCodes } = require('http-status-codes');
const positionRepository = require('../repositories/PositionRepository')
//arg thường là cả req.body
exports.addPosition = async (position) => {
    //positionQuery sẽ lấy những trường cần thiết trong req.body để truyền vào
    return positionDTO.positionResponse(await positionRepository.createPosition(positionDTO.positionQuery(position)));

}
//arg là req.query
exports.getPositions = async ({ keyword }) => {
    return (await positionRepository.getPositions((keyword) ? keyword : null)).map(r => positionDTO.positionResponse(r));
}

//arg là (req.params, req.body)
exports.updatePositionById = async ({ positionId }, position) => {
    if (positionId === undefined || positionId === null)
        throw new ErrorHandling(StatusCodes.BAD_REQUEST, "positionId is required");
    return positionDTO.positionResponse(await positionRepository.updatePositionById(positionId, positionDTO.positionQuery(position)));
} 
exports.getPositionById = async ({ positionId }) => {
    if (positionId === undefined || positionId === null)
        throw new ErrorHandling(StatusCodes.BAD_REQUEST, "positionId is required");
    return positionDTO.positionResponse(await positionRepository.findPositionById(positionId));
} 
exports.deletePositionById = async ({ positionId }) => {
    if (positionId === undefined || positionId === null)
        throw new ErrorHandling(StatusCodes.BAD_REQUEST, "positionId is required");
    return positionDTO.positionResponse(await positionRepository.deletePositionById(positionId));
} 