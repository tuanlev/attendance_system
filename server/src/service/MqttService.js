const { getIo } = require("../config/socket");
const { employeeMQTT } = require("../DTOs/EmployeeDTO");
const { addCheckin } = require("../repositories/CheckinRepository");
const employeeService = require("../service/EmployeeService")
const { addDevice, getDeviceByExternal_id } = require("./DeviceService");
// const { addShiftRecord } = require("./shiftrecord.service");
async function handleMessage(topic, message) {
    try {
        const messageString = message.toString();
        let eventData = JSON.parse(messageString);
        const { cmd } = eventData;
        let findDeviceData
        try {
            findDeviceData = await getDeviceByExternal_id({external_id:eventData.deviceId});
        if (!findDeviceData)
           findDeviceData = await addDevice({external_id:eventData.deviceId});
        console.log(findDeviceData)
        } catch (e) {
            console.log('device existed');
        }
        if (!cmd) {
            console.error('Missing cmd in message:', eventData);
            return;
        }
       
        if (cmd === 'log'||cmd =="retry_employee") {
            const processedData = {
                external_id:eventData.id,
                device_ex_id: eventData.deviceId,
                employee_ex_id: eventData.employeeId,
                checkin_at: new Date(eventData.timestamp),
                faceBase64: "data:image/jpeg;base64," + eventData.faceBase64,

            };
            const result = await addCheckin(processedData);
            try {
                console.log("result",result)
            //    console.log( await addShiftRecord(result));
            } catch (e) {
                console.error('Error adding checkin:', e.message);
            }
            const io = getIo();
            if (io) {
                io.emit('checkin', result);
            }
            else console.error('Socket.IO not initialized');
            console.log("mqtt.service.handleMessage.log.success" + result);

            // await addShiftRecord(result);
            return;
        }

        if (cmd === 'add_employee') {
            // Thêm hoặc cập nhật nhân viên
            const registrationData = {
                external_id: eventData.employeeId,
                fullname: eventData.employeeName,
                device_id: findDeviceData.id,
                faceBase64: "data:image/jpeg;base64," + eventData.faceBase64,
                registered_at: new Date(eventData.timestamp ? eventData.timestamp : Date.now),
            };
            // Kiểm tra nếu đã tồn tại thì cập nhật, chưa có thì thêm mới
            await employeeService.addEmployee(registrationData);
            console.log("mqtt.service.handleMessage.addEmployee.success")
            return;
        }

        if (cmd === 'delete_employee') {
            // Xóa nhân viên
            await employeeService.deleteEmployeeByExternal_id(eventData.employeeId);

            console.log("mqtt.service.handleMessage.deleteEmployee.success")
            return;
        }
        if (cmd == 'edit_employee') {
            console.log("mqtt.service.handleMessage.editEmployee.success",await employeeService.editEmployee( employeeMQTT(eventData,findDeviceData)))
            return;
        }
        console.error('Unknown cmd:', cmd);
    } catch (e) {
        console.error('mqtt.service.handleMessage.error', e.message);

    } finally {
        return;
    }
}

module.exports = { handleMessage }