const deviceDTO = require('../DTOs/DeviceDTO');
const { errorHandling } = require('../middleware/ErrorHandling');
const deviceRepository = require('../repositories/DeviceRepository')
const { StatusCodes } = require('http-status-codes');

//arg thường là cả req.body
exports.addDevice = async (device) => {
    //deviceQuery sẽ lấy những trường cần thiết trong req.body để truyền vào
    return await deviceRepository.createDevice(deviceDTO.deviceQuery(device));

}
//arg là req.query
exports.getDevices = async ({ keyword }) => {
    return await deviceRepository.getDevices((keyword) ? keyword : null)
}

//arg là (req.params, req.body)
exports.updateDeviceById = async ({ device_id }, device) => {
    if (device_id === undefined || device_id === null)
        throw new errorHandling(StatusCodes.BAD_REQUEST, "device_id is required");
    return await deviceRepository.updateDeviceById(device_id, deviceDTO.deviceQuery(device));
} 
exports.getDeviceById = async ({ device_id }) => {
    if (device_id === undefined || device_id === null)
        throw new errorHandling(StatusCodes.BAD_REQUEST, "device_id is required");
    return await deviceRepository.findDeviceById(device_id);
}
exports.deleteDeviceById = async ({ device_id }) => {
    if (device_id === undefined || device_id === null)
        throw new errorHandling(StatusCodes.BAD_REQUEST, "device_id is required");
    return await deviceRepository.deleteDeviceById(device_id);
} 