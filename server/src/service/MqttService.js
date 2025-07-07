const { getIo } = require("../config/socket");
const { addCheckin } = require("../repository/CheckinRepository");

const { editEmployee, deleteEmployeeById, addEmployee } = require("../repository/EmployeeRepository");
const { addDevice } = require("./device.service");
const { addShiftRecord } = require("./shiftrecord.service");
async function handleMessage(topic, message) {
    try {
        const messageString = message.toString();
        let eventData = JSON.parse(messageString);
        const { cmd } = eventData;
        try {
        await addDevice({device_id:eventData.device_id});
        } catch (e) {
            console.error('add device if not exist', e.message);
        }
        if (!cmd) {
            console.error('Missing cmd in message:', eventData);
            return;
        }
        if (cmd === 'log') {
            const processedData = {

                device: eventData.device_id,
                employee: eventData.employee_id,
                timestamp: new Date(eventData.timestamp),
                faceBase64: "data:image/jpeg;base64," + eventData.faceBase64,

            };
            const result = await addCheckin(processedData);
            try {
                console.log("result",result)
               console.log( await addShiftRecord(result));
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
                _id: eventData.employee_id,
                fullName: eventData.employeeName,
                device: eventData.device_id,
                faceEmbedding: eventData.faceEmbedding,
                faceBase64: "data:image/jpeg;base64," + eventData.faceBase64,
                registrationDate: new Date(eventData.timestamp ? eventData.timestamp : Date.now),
            };
            // Kiểm tra nếu đã tồn tại thì cập nhật, chưa có thì thêm mới
            await addEmployee(registrationData);
            console.log("mqtt.service.handleMessage.addEmployee.success")
            return;
        }

        if (cmd === 'delete_employee') {
            // Xóa nhân viên
            await deleteEmployeeById(eventData.employee_id);

            console.log("mqtt.service.handleMessage.deleteEmployee.success")
            return;
        }
        if (cmd == 'edit_employee') {
            let editData = {
                _id: eventData.employee_id,
                fullName: eventData.employeeName,
                device: eventData.device_id,
            };
            if (eventData.faceBase64) {
                editData.faceBase64 = "data:image/jpeg;base64, " + eventData.faceBase64;
            }
            if (eventData.faceEmbedding) {
                editData.faceEmbedding = eventData.faceEmbedding;
            }
            editEmployee(editData);
            console.log("mqtt.service.handleMessage.editEmployee.success")
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