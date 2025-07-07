const positionDTO = require('../DTOs/PositionDTO');
const ErrorCustom = require('../errorcustom/ErrorCustom');
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
exports.updatePositionById = async ({ position_id }, position) => {
    if (position_id === undefined || position_id === null)
        throw new ErrorCustom(StatusCodes.BAD_REQUEST, "position_id is required");
    return positionDTO.positionResponse(await positionRepository.updatePositionById(position_id, positionDTO.positionQuery(position)));
} 
exports.getPositionById = async ({ position_id }) => {
    if (position_id === undefined || position_id === null)
        throw new ErrorCustom(StatusCodes.BAD_REQUEST, "position_id is required");
    return positionDTO.positionResponse(await positionRepository.findPositionById(position_id));
} 
exports.deletePositionById = async ({ position_id }) => {
    if (position_id === undefined || position_id === null)
        throw new ErrorCustom(StatusCodes.BAD_REQUEST, "position_id is required");
    return positionDTO.positionResponse(await positionRepository.deletePositionById(position_id));
} 