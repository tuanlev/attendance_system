const { createErrorDto } = require('./ErrorDTOPattern');

// Chuẩn hóa time về HH:mm:ss khi nhận vào
function normalizeTimeInput(time, field) {
    if (!time || typeof time !== 'string') throw createErrorDto(field);
    const match = time.match(/^(\d{2}):(\d{2})(?::(\d{2}))?$/);
    if (!match) throw createErrorDto(`${field} must be in HH:mm or HH:mm:ss format`);
    let [ , hh, mm, ss ] = match;
    hh = Number(hh); mm = Number(mm); ss = ss !== undefined ? Number(ss) : 0;
    if (hh > 23 || mm > 59 || ss > 59) throw createErrorDto(`${field} is not a valid time`);
    // Trả về đúng định dạng HH:mm:ss
    return `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
}

// Chỉ xuất ra HH:mm
function toHHmm(time) {
    if (!time || typeof time !== 'string') return time;
    const match = time.match(/^(\d{2}):(\d{2})/);
    return match ? `${match[1]}:${match[2]}` : time;
}

exports.shiftQuery = ({ name, start_time, end_time }) => {
    if (!name || !name.toString().trim()) {
        throw createErrorDto('shift name');
    }
    return {
        name: name.toString().trim(),
        start_time: normalizeTimeInput(start_time, 'start_time'),
        end_time: normalizeTimeInput(end_time, 'end_time')
    };
};

exports.shiftResponse = ({ id, name, start_time, end_time, updated_at }) => {
    return {
        id: id !== undefined ? Number(id) : undefined,
        name,
        start_time: toHHmm(start_time),
        end_time: toHHmm(end_time),
        updated_at
    };
};