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
    status,
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

        status,
        faceBase64,
        registered_at,
        updated_at
    };
};

// Xử lý dữ liệu đầu vào khi tạo/cập nhật employee
exports.employeeQuery = ({
    external_id,
    fullname,
    phone,
    email,
    department_id,
    position_id,
    device_id,
    shift_id,
    status,
    faceBase64
}) => {
    if (!external_id || !external_id.toString().trim()) {
        throw createErrorDto('external_id');
    }
    return {
        external_id: external_id.toString().trim(),
        fullname: fullname ? fullname.toString().trim() : undefined,
        phone,
        email,
        department_id: (department_id !== undefined && department_id !== null && department_id !== "") ? Number(department_id) : null,
        position_id: (position_id !== undefined && position_id !== null && position_id !== "") ? Number(position_id) : null,
        device_id: (device_id !== undefined && device_id !== null && device_id !== "") ? Number(device_id) : null,
        shift_id: (shift_id !== undefined && shift_id !== null && shift_id !== "") ? Number(shift_id) : null,

        status,
        faceBase64
    };
};

// Chuẩn hóa dữ liệu tìm kiếm employee (search/filter)
exports.employeeSearchQuery = ({ department_id, position_id, keyword, shift_id, device_id }) => {
    const query = {};
    if (device_id && device_id.toString().trim()) query.device_id = device_id.toString().trim();
    if (department_id !== undefined && department_id !== null && department_id !== "")
        query.department_id = Number(department_id);
    if (position_id !== undefined && position_id !== null && position_id !== "")
        query.position_id = Number(position_id);
    if (shift_id !== undefined && shift_id !== shift_id && shift_id !== "")
        query.shift_id = Number(shift_id);
    if (keyword && keyword.toString().trim())
        query.keyword = keyword.toString().trim();
    return query;
};