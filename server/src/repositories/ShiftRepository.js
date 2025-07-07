const { pool } = require('../config/Connection');
const ErrorCustom = require('../errorcustom/ErrorCustom');
const { StatusCodes } = require('http-status-codes');

// Tạo shift mới
exports.createShift = async (shift) => {
    try {
        const [result] = await pool.query(
            'INSERT INTO shifts (name, start_time, end_time) VALUES (:name, :start_time, :end_time)',
            shift
        );
        const [rows] = await pool.query(
            'SELECT id, name, start_time, end_time, updated_at FROM shifts WHERE id = :id',
            { id: result.insertId }
        );
        return rows[0];
    } catch (error) {
        throw new ErrorCustom(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};

// Tìm shift theo tên
exports.findShiftByName = async (name) => {
    try {
        const [rows] = await pool.query(
            'SELECT id, name, start_time, end_time, updated_at FROM shifts WHERE name = :name',
            { name }
        );
        return rows[0] || null;
    } catch (error) {
        throw new ErrorCustom(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};

// Tìm shift theo id
exports.findShiftById = async (id) => {
    try {
        const [rows] = await pool.query(
            'SELECT id, name, start_time, end_time, updated_at FROM shifts WHERE id = :id',
            { id }
        );
        return rows[0] || null;
    } catch (error) {
        throw new ErrorCustom(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};

// Lấy danh sách shifts (có thể tìm kiếm theo tên)
exports.getShifts = async (keyword) => {
    try {
        let query = 'SELECT id, name, start_time, end_time, updated_at FROM shifts';
        let params = {};
        if (keyword && keyword.toString().trim()) {
            query += ' WHERE name LIKE :keyword';
            params.keyword = `%${keyword.trim()}%`;
        }
        query += ' ORDER BY updated_at DESC';
        const [rows] = await pool.query(query, params);
        return rows;
    } catch (error) {
        throw new ErrorCustom(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};

// Cập nhật shift theo id
exports.updateShiftById = async (id, shift) => {
    try {
        const [result] = await pool.query(
            'UPDATE shifts SET name = :name, start_time = :start_time, end_time = :end_time WHERE id = :id',
            { ...shift, id }
        );
        if (result.affectedRows === 0) {
            throw new ErrorCustom(StatusCodes.NOT_FOUND, "Shift not found");
        }
        const [rows] = await pool.query(
            'SELECT id, name, start_time, end_time, updated_at FROM shifts WHERE id = :id',
            { id }
        );
        return rows[0];
    } catch (error) {
        throw new ErrorCustom(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};

// Xóa shift theo id
exports.deleteShiftById = async (id) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM shifts WHERE id = :id',
            { id }
        );
        if (result.affectedRows === 0) {
            throw new ErrorCustom(StatusCodes.NOT_FOUND, "Shift not found");
        }
        return { message: "Shift deleted successfully" };
    } catch (error) {
        throw new ErrorCustom(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};