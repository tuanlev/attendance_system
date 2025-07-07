const { pool } = require('../config/Connection');
const ErrorCustom = require('../errorcustom/ErrorCustom');
const { StatusCodes } = require('http-status-codes');

// Tạo employee mới (chỉ cho phép tạo với device_id này) for mqtt

exports.createEmployeeByDeviceId = async (employee,device_id) => {
    try {
        const [check] = await pool.query(
            'SELECT id FROM employees WHERE external_id = :external_id',
            { external_id: employee.external_id }
        );
        if (check[0]) {
            throw new ErrorCustom(StatusCodes.CONFLICT, "external_id already exists on users");
        }
        const [result] = await pool.query(
            `INSERT INTO employees 
            (external_id, fullname, phone, email, department_id, position_id,shift_id, device_id, faceBase64) 
            VALUES (:external_id, :fullname, :phone, :email, :department_id, :position_id,:shift_id, :device_id, :faceBase64)`,
            { ...employee,device_id}
        );
        const [rows] = await pool.query(
            'SELECT * FROM employees WHERE id = :id',
                { id: result.insertId }
            );
        return rows[0];
    } catch (error) {
        throw new ErrorCustom(StatusCodes.INTERNAL_SERVER_ERROR, error.message+"createEmployee");
    }
};

// Tìm employee theo external_id và device_id
exports.findEmployeeByExternalId = async (external_id, device_id) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM employees WHERE external_id = :external_id AND device_id = :device_id',
            { external_id, device_id }
        );
        return rows[0] || null;
    } catch (error) {
        throw new ErrorCustom(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};

// Tìm employee theo id và device_id
exports.findEmployeeById = async (id, device_id) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM employees WHERE id = :id AND device_id = :device_id',
            { id, device_id }
        );
        return rows[0] || null;
    } catch (error) {
        throw new ErrorCustom(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};

// Lấy danh sách employees với filter động và device_id
exports.getEmployees = async (searchParams, device_id) => {
    try {
        let query = 'SELECT * FROM employees WHERE device_id = :device_id';
        let params = { device_id };

        if (searchParams.department_id) {
            query += ' AND department_id = :department_id';
            params.department_id = searchParams.department_id;
        }
        if (searchParams.position_id) {
            query += ' AND position_id = :position_id';
            params.position_id = searchParams.position_id;
        }
        if (searchParams.shift_id) {
            query += ' AND shift_id = :shift_id';
            params.shift_id = searchParams.shift_id;
        }
        if (searchParams.keyword) {
            query += ' AND fullname LIKE :keyword';
            params.keyword = `%${searchParams.keyword}%`;
        }
        query += ' ORDER BY updated_at DESC';

        const [rows] = await pool.query(query, params);
        return rows;
    } catch (error) {
        throw new ErrorCustom(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};

// Cập nhật employee theo id và device_id
exports.updateEmployeeByIdAndDevice = async (id, employee) => {
    try {
    
        const [result] = await pool.query(
            `UPDATE employees SET 
                external_id = :external_id,
                fullname = :fullname,
                phone = :phone,
                email = :email,
                department_id = :department_id,
                shift_id =:shift_id,
                position_id = :position_id,
                faceBase64 = :faceBase64
            WHERE id = :id AND device_id = :device_id`,
            { ...employee, id }
        );
        if (result.affectedRows === 0) {
            throw new ErrorCustom(StatusCodes.NOT_FOUND, "Employee not found on this device");
        }
        const [rows] = await pool.query(
            'SELECT * FROM employees WHERE id = :id AND device_id = :device_id',
            { id, device_id:employee.device_id }
        );
        return rows[0];
    } catch (error) {
        throw new ErrorCustom(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};

// Xóa employee theo id và device_id
exports.deleteEmployeeById = async (id, device_id) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM employees WHERE id = :id AND device_id = :device_id',
            { id, device_id }
        );
        if (result.affectedRows === 0) {
            throw new ErrorCustom(StatusCodes.NOT_FOUND, "Employee not found on this device");
        }
        return { message: "Employee deleted successfully" };
    } catch (error) {
        throw new ErrorCustom(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};

//formqtt


exports.createEmployee = async (employee) => {
    try {
        const [check] = await pool.query(
            'SELECT id FROM employees WHERE external_id = :external_id',
            { external_id: employee.external_id }
        );
        if (check[0]) {
            throw new ErrorCustom(StatusCodes.CONFLICT, "external_id already exists on users");
        }
        const [result] = await pool.query(
            `INSERT INTO employees 
            (external_id, fullname, phone, email, department_id, position_id,shift_id, device_id, faceBase64) 
            VALUES (:external_id, :fullname, :phone, :email, :department_id, :position_id,:shift_id, :device_id, :faceBase64)`,
            { ...employee}
        );
        const [rows] = await pool.query(
            'SELECT * FROM employees WHERE id = :id',
                { id: result.insertId }
            );
        return rows[0];
    } catch (error) {
        throw new ErrorCustom(StatusCodes.INTERNAL_SERVER_ERROR, error.message+"createEmployee");
    }
};
exports.deleteEmployeeByExternal_id = async (external_id) => {
    try {
        console.log(external_id)
        const [result] = await pool.query(
            'DELETE FROM employees WHERE external_id = :external_id ',
            { external_id }
        );
        if (result.affectedRows === 0) {
            throw new ErrorCustom(StatusCodes.NOT_FOUND, "Employee not found on this device");
        }
        return { message: "Employee deleted successfully" };
    } catch (error) {
        throw new ErrorCustom(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.editEmployee = async (employeeData) => {
  try {
    const { external_id, ...fieldsToUpdate } = employeeData;

    if (!external_id) {
      throw new ErrorCustom(StatusCodes.BAD_REQUEST, "Missing employee id");
    }

    // Lọc trường có giá trị
    const sets = [];
    const values = { external_id };

    for (const [key, value] of Object.entries(fieldsToUpdate)) {
      if (value !== undefined && value !== null) {
        sets.push(`${key} = :${key}`);
        values[key] = value;
      }
    }

    if (sets.length === 0) {
      throw new ErrorCustom(StatusCodes.BAD_REQUEST, "No fields to update");
    }

    const sql = `
      UPDATE employees 
      SET ${sets.join(', ')}
      WHERE external_id = :external_id
    `;

    const [result] = await pool.query(sql, values);

    if (result.affectedRows === 0) {
      throw new ErrorCustom(StatusCodes.NOT_FOUND, "Employee not found");
    }

    // Trả về bản ghi mới
    const [rows] = await pool.query(
      `SELECT * FROM employees WHERE external_id = :external_id`,
      { external_id }
    );

    return rows[0];
  } catch (error) {
    throw new ErrorCustom(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};