const { getShiftRecords } = require("../repositories/ShiftRecordRepository");

exports.getShiftRecords = async (query,device_id) => {
    if (!query.department_id ||query.department_id.toString().trim() == "") delete query.department_id;
        if (!query.position_id ||query.position_id.toString().trim() == "") delete query.position_id;
    return await getShiftRecords(query,device_id)
}