const { pool } = require('../config/Connection');

const pad = (n) => (n < 10 ? '0' + n : n);

const getLocalTimePart = (date) => {
    const hh = pad(date.getHours());
    const mm = pad(date.getMinutes());
    const ss = pad(date.getSeconds());
    return `${hh}:${mm}:${ss}`;
};

exports.createShiftRecord = async (checkin) => {
    const { employee_ex_id, checkin_at } = checkin;

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const [employeeRows] = await connection.query(
            `
      SELECT 
        e.id AS employee_id,
        e.shift_id,
        s.start_time,
        s.end_time
      FROM employees e
      JOIN shifts s ON e.shift_id = s.id
      WHERE e.external_id = ?
      `,
            [employee_ex_id]
        );

        if (employeeRows.length === 0) {
            throw new Error('Employee not found!');
        }

        const { employee_id, shift_id, start_time, end_time } = employeeRows[0];

        const checkinDateObj = new Date(checkin_at);
        const dateOnly = checkinDateObj.toISOString().slice(0, 10); // vẫn chuẩn vì phần ngày UTC không lệch nhiều
        const checkinTime = getLocalTimePart(checkinDateObj);

        const [shiftRecordRows] = await connection.query(
            `SELECT * FROM shiftrecords WHERE employee_id = ? AND time = ?`,
            [employee_id, dateOnly]
        );

        if (shiftRecordRows.length === 0) {
            const checkinStatus = checkinTime <= start_time ? 'on-time' : 'late';

            await connection.query(
                `INSERT INTO shiftrecords 
          (checkin, employee_id, shift_id, time, checkin_status)
         VALUES (?, ?, ?, ?, ?)`,
                [checkin_at, employee_id, shift_id, dateOnly, checkinStatus]
            );

        } else {
            const checkoutTime = getLocalTimePart(checkinDateObj);
            const checkoutStatus = checkoutTime >= end_time ? 'on-time' : 'early-leave';

            await connection.query(
                `UPDATE shiftrecords 
         SET checkout = ?, checkout_status = ?
         WHERE id = ?`,
                [checkin_at, checkoutStatus, shiftRecordRows[0].id]
            );
        }

        await connection.commit();

    } catch (err) {
        console.log('[createShiftRecord] ERROR:', err.message);
        await connection.rollback();
    } finally {
        connection.release();
    }
};

exports.getShiftRecords = async (params = {}, device_id) => {
    const connection = await pool.getConnection();

    try {
        const {
            department_id,
            position_id,
            date_start,
            employee_id,
            date_end
        } = params;

        // ✅ Ngày mặc định: hôm nay
        const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

        const startDate = date_start || today;
        const endDate = date_end || today;

        let query = `
      SELECT 
  sr.*, 
  e.fullname, 
  e.department_id, 
  e.position_id, 
  e.device_id,
  sh.name AS shift_name,
  p.name AS position_name,
  dept.name AS department_name
FROM shiftrecords sr
JOIN employees e ON sr.employee_id = e.id
JOIN shifts sh ON sr.shift_id = sh.id
JOIN positions p ON e.position_id = p.id
JOIN departments dept ON e.department_id = dept.id
      WHERE sr.time BETWEEN ? AND ?
    `;

        const queryParams = [startDate, endDate];

        if (department_id) {
            query += ' AND e.department_id = ?';
            queryParams.push(department_id);
        }
        if (position_id) {
            query += ' AND e.position_id = ?';
            queryParams.push(position_id);
        }
        if (employee_id) {
            query += ' AND e.id = ?';
            queryParams.push(employee_id);
        }
        if (device_id) {
            query += ' AND e.device_id = ?';
            queryParams.push(device_id);
        }

        // Sắp xếp mới nhất trước
        query += ' ORDER BY sr.time DESC';
        console.log(query)
        const [rows] = await connection.query(query, queryParams);

        return rows;

    } catch (err) {
        console.log('[getShiftRecords] ERROR:', err.message);
        throw err;
    } finally {
        connection.release();
    }
};
