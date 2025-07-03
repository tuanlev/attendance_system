const { pool } = require('../config/Connection');
const ErrorHandling = require('../ErrorHandling/ErrorHandling');
const Department = require('../model/Department');
const { ReasonPhrases, StatusCodes } = require('http-status-codes');

exports.createDepartment = async (department) => {
    const check = await exports.findDepartmentByName(department.name);
    if (check[0]) throw new ErrorHandling(StatusCodes.CONFLICT, "Department name already exists");
    try {
        const [result] = await pool.query(
            'INSERT INTO departments (name) VALUES (:name)',
            department
        );
        const [rows] = await pool.query(
            'SELECT id, name, updated_at FROM departments WHERE id = ?',
            [result.insertId]
        );
        return rows[0];
    } catch (error) {
        if (error instanceof ErrorHandling) throw error
        throw new ErrorHandling(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.findDepartmentByName = async (name) => {
    try {
        const [rows] = await pool.query('SELECT id, name FROM departments WHERE name = ?', [name]);
        return rows;
    } catch (error) {
        throw new ErrorHandling(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.findDepartmentById = async (id) => {
    try {
        const [rows] = await pool.query(
            'SELECT id, name, updated_at FROM departments WHERE id = :id',
            { id }
        );
        return rows[0] || null;
    } catch (error) {
        if (error instanceof ErrorHandling) throw error
        throw new ErrorHandling(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.getDepartments = async (keyword) => {
    try {
        let query = 'SELECT id, name, updated_at FROM departments';
        let params = {};
        if (keyword && keyword.toString().trim()) {
            query += ' WHERE name LIKE :keyword';
            params.keyword = `%${keyword.trim()}%`;
        }
        query += ' ORDER BY updated_at DESC';
        const [rows] = await pool.query(query, params);
        return rows;
    } catch (error) {
        if (error instanceof ErrorHandling) throw error
        throw new ErrorHandling(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};
exports.updateDepartmentById = async (id, department) => {
    try {
        // Kiểm tra tên phòng ban đã tồn tại cho id khác chưa
        if (department.name) {
            const [check] = await pool.query(
                'SELECT id FROM departments WHERE name = :name AND id != :id',
                { name: department.name, id }
            );
            if (check[0]) {
                throw new ErrorHandling(StatusCodes.CONFLICT, "Department name already exists");
            }
        }

        // Cập nhật phòng ban
        const [result] = await pool.query(
            'UPDATE departments SET name = :name WHERE id = :id',
            { ...department, id }
        );

        if (result.affectedRows === 0) {
            throw new ErrorHandling(StatusCodes.NOT_FOUND, "Department not found");
        }

        // Trả về thông tin phòng ban sau khi cập nhật
        const [rows] = await pool.query(
            'SELECT id, name, updated_at FROM departments WHERE id = :id',
            { id }
        );
        return rows[0];
    } catch (error) {
        if (error instanceof ErrorHandling) throw error
        throw new ErrorHandling(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};
exports.deleteDepartmentById = async (id) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM departments WHERE id = :id',
            { id }
        );
        if (result.affectedRows === 0) {
            throw new ErrorHandling(StatusCodes.NOT_FOUND, "Department not found");
        }
        return { message: "Department deleted successfully" };
    } catch (error) {
        if (error instanceof ErrorHandling) throw error
        throw new ErrorHandling(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};