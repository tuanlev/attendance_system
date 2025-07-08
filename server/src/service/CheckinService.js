const { getCheckins } = require("../repositories/CheckinRepository.js")

exports.getCheckins  =async (query,device_id)=> {
    if (!device_id) return [];
    return await getCheckins(query,device_id)
}