const { pool } = require('../config/Connection');
const ErrorHandling = require('../ErrorHandling/ErrorHandling');
const { StatusCodes } = require('http-status-codes');

// Tạo employee mới (chỉ cho phép tạo với device_id này)
exports.createEmployee = async (employee, device_id) => {
    try {
        // Kiểm tra external_id đã tồn tại trên device_id này chưa
        const [check] = await pool.query(
            'SELECT id FROM employees WHERE external_id = :external_id AND device_id = :device_id',
            { external_id: employee.external_id, device_id }
        );
        if (check[0]) {
            throw new ErrorHandling(StatusCodes.CONFLICT, "external_id already exists on this device");
        }
        const [result] = await pool.query(
            `INSERT INTO employees 
            (external_id, fullname, phone, email, department_id, position_id,shift_id, device_id, status, faceBase64) 
            VALUES (:external_id, :fullname, :phone, :email, :department_id, :position_id, :device_id, :status, :faceBase64)`,
            { ...employee, device_id }
        );
        const [rows] = await pool.query(
            'SELECT * FROM employees WHERE id = :id AND device_id = :device_id',
            { id: result.insertId, device_id }
        );
        return rows[0];
    } catch (error) {
        throw new ErrorHandling(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
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
        throw new ErrorHandling(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
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
        throw new ErrorHandling(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
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
        throw new ErrorHandling(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};

// Cập nhật employee theo id và device_id
exports.updateEmployeeById = async (id, employee, device_id) => {
    try {
        // Nếu có external_id mới, kiểm tra trùng trên device_id này
        if (employee.external_id) {
            const [check] = await pool.query(
                'SELECT id FROM employees WHERE external_id = :external_id AND id != :id AND device_id = :device_id',
                { external_id: employee.external_id, id, device_id }
            );
            if (check[0]) {
                throw new ErrorHandling(StatusCodes.CONFLICT, "external_id already exists on this device");
            }
        }
        const [result] = await pool.query(
            `UPDATE employees SET 
                external_id = :external_id,
                fullname = :fullname,
                phone = :phone,
                email = :email,
                department_id = :department_id,
                shift_id =:shift_id,
                position_id = :position_id,
                status = :status,
                faceBase64 = :faceBase64
            WHERE id = :id AND device_id = :device_id`,
            { ...employee, id, device_id }
        );
        if (result.affectedRows === 0) {
            throw new ErrorHandling(StatusCodes.NOT_FOUND, "Employee not found on this device");
        }
        const [rows] = await pool.query(
            'SELECT * FROM employees WHERE id = :id AND device_id = :device_id',
            { id, device_id }
        );
        return rows[0];
    } catch (error) {
        throw new ErrorHandling(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
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
            throw new ErrorHandling(StatusCodes.NOT_FOUND, "Employee not found on this device");
        }
        return { message: "Employee deleted successfully" };
    } catch (error) {
        throw new ErrorHandling(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};