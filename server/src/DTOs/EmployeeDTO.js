const { employeeDTO } = require('../../../../qlcc/server/src/dtos/employee.dto');
const { createErrorDto } = require('./ErrorDTOPattern');

// Chuẩn hóa dữ liệu trả về cho employee
exports.employeeResponse = ({
    id,
    external_id,
    fullname,
    phone,
    email,
    department_id,
    position_id,
    device_id,
    shift_id,
    faceBase64,
    registered_at,
    updated_at
}) => {
    return {
        id: (id !== undefined && id !== null && id !== "") ? Number(id) : undefined,
        external_id,
        fullname,
        phone,
        email,
        department_id: (department_id !== undefined && department_id !== null && department_id !== "") ? Number(department_id) : undefined,
        position_id: (position_id !== undefined && position_id !== null && position_id !== "") ? Number(position_id) : undefined,
        device_id: (device_id !== undefined && device_id !== null && device_id !== "") ? Number(device_id) : undefined,
        shift_id: (shift_id !== undefined && shift_id !== null && shift_id !== "") ? Number(shift_id) : undefined,
        faceBase64,
        registered_at,
        updated_at
    };
};

//formqtt
exports.employeeQuery = ({
  external_id,
  fullname,
  phone,
  email,
  department_id,
  position_id,
  shift_id,
  device_id,
  registered_at,
  faceBase64
}) => {
  if (!external_id || !external_id.toString().trim()) {
    throw createErrorDto('external_id');
  }

  return {
    external_id: external_id.toString().trim(),
    fullname: fullname && fullname.toString().trim() !== '' ? fullname.toString().trim() : null,
    phone: phone && phone.toString().trim() !== '' ? phone.toString().trim() : null,
    email: email && email.toString().trim() !== '' ? email.toString().trim() : null,
    department_id: (department_id)? department_id : null,
    position_id: (position_id) ? position_id : null,
    shift_id: (shift_id)? shift_id : null,
    device_id : device_id?device_id:null,
    registered_at : (registered_at)?registered_at:null,
    faceBase64: faceBase64 && faceBase64.toString().trim() !== '' ? faceBase64.toString().trim() : null
  };
};
exports.employeeBody = ({
  external_id,
  fullname,
  phone,
  email,
  department_id,
  position_id,
  shift_id,
  registered_at,
  faceBase64
}) => {
  if (!external_id || !external_id.toString().trim()) {
    throw createErrorDto('external_id');
  }

  return {
    external_id: external_id.toString().trim(),
    fullname: fullname && fullname.toString().trim() !== '' ? fullname.toString().trim() : null,
    phone: phone && phone.toString().trim() !== '' ? phone.toString().trim() : null,
    email: email && email.toString().trim() !== '' ? email.toString().trim() : null,
    department_id: (department_id)? department_id : null,
    position_id: (position_id) ? position_id : null,
    shift_id: (shift_id)? shift_id : null,
    registered_at : (registered_at)?registered_at:null,
    faceBase64: faceBase64 && faceBase64.toString().trim() !== '' ? faceBase64.toString().trim() : null
  };
};


// Chuẩn hóa dữ liệu tìm kiếm employee (search/filter)
exports.employeeSearchQuery = ({ department_id, position_id, keyword, shift_id, device_id }) => {
    const query = {};
    if (device_id && device_id.toString().trim()) query.device_id = device_id.toString().trim();
    if (department_id !== undefined && department_id !== null && department_id.toString().trim()  !== "")
        query.department_id = department_id;
    if (position_id !== undefined && position_id !== null && position_id.toString().trim()  !== "")
        query.position_id = position_id;
    if (shift_id !== undefined && shift_id !== null && shift_id.toString().trim()  !== "")
        query.shift_id = shift_id;
    if (keyword && keyword.toString().trim())
        query.keyword = keyword.toString().trim();
    return query;
};

exports. employeeMQTT = (eventData, findDeviceData) =>{
  const raw = {
    external_id: eventData.employeeId,
    fullname: eventData.employeeName,
    device_id: findDeviceData?.id,
    faceBase64: eventData.faceBase64
      ? "data:image/jpeg;base64," + eventData.faceBase64
      : undefined,
    registered_at: eventData.timestamp
      ? new Date(eventData.timestamp)
      : undefined,
  };

  // Loại bỏ undefined/null
  const cleaned = {};
  for (const [key, value] of Object.entries(raw)) {
    if (value !== undefined && value !== null) {
      cleaned[key] = value;
    }
  }

  return cleaned;
}
 