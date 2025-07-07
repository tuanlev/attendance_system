const { pool } = require('../config/Connection');
const ErrorCustom = require('../errorcustom/ErrorCustom');
const Device = require('../model/Device');
const { ReasonPhrases, StatusCodes } = require('http-status-codes');

exports.createDevice = async (device) => {
    const check = await exports.findDeviceByName(device.name);
    if (check[0]) throw new ErrorCustom(StatusCodes.CONFLICT, "Device name already exists");
    try {
        const [result] = await pool.query(
            'INSERT INTO devices (external_id,name,description) VALUES (:external_id,:name, :description )',
            device
        );
        const [rows] = await pool.query(
            'SELECT * FROM devices WHERE id = ?',
            [result.insertId]
        );
        return rows[0];
    } catch (error) {
        if (error instanceof ErrorCustom) throw error
        throw new ErrorCustom(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.findDeviceByName = async (name) => {
    try {
        const [rows] = await pool.query('SELECT * FROM devices WHERE name = ?', [name]);
        return rows;
    } catch (error) {
        throw new ErrorCustom(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.findDeviceById = async (id) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM devices WHERE id = :id',
            { id }
        );
        return rows[0] || null;
    } catch (error) {
        if (error instanceof ErrorCustom) throw error
        throw new ErrorCustom(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};
exports.getDeviceByExternal_id = async (external_id) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM devices WHERE external_id = :external_id',
            { external_id }
        );
        return rows[0] || null;
    } catch (error) {
        if (error instanceof ErrorCustom) throw error
        throw new ErrorCustom(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};


exports.getDevices = async (keyword) => {
    try {
        let query = 'SELECT * FROM devices';
        let params = {};
        if (keyword && keyword.toString().trim()) {
            query += ' WHERE name LIKE :keyword or external_id LIKE :keyword';
            params.keyword = `%${keyword.trim()}%`;
        }
        query += ' ORDER BY updated_at DESC';
        const [rows] = await pool.query(query, params);
        return rows;
    } catch (error) {
        if (error instanceof ErrorCustom) throw error
        throw new ErrorCustom(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};
exports.updateDeviceById = async (id, device) => {
    try {
        // Kiểm tra tên phòng ban đã tồn tại cho id khác chưa
        if (device.name) {
            const [check] = await pool.query(
                'SELECT id FROM devices WHERE name = :name AND id != :id',
                { name: device.name, id }
            );
            if (check[0]) {
                throw new ErrorCustom(StatusCodes.CONFLICT, "Device name already exists");
            }
        }

        // Cập nhật phòng ban
        const [result] = await pool.query(
            'UPDATE devices SET name = :name, external_id=:external_id, description= :description WHERE id = :id',
            { ...device, id }
        );

        if (result.affectedRows === 0) {
            throw new ErrorCustom(StatusCodes.NOT_FOUND, "Device not found");
        }

        // Trả về thông tin phòng ban sau khi cập nhật
        const [rows] = await pool.query(
            'SELECT * FROM devices WHERE id = :id',
            { id }
        );
        return rows[0];
    } catch (error) {
        if (error instanceof ErrorCustom) throw error
        throw new ErrorCustom(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};
exports.deleteDeviceById = async (id) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM devices WHERE id = :id',
            { id }
        );
        if (result.affectedRows === 0) {
            throw new ErrorCustom(StatusCodes.NOT_FOUND, "Device not found");
        }
        return { message: "Device deleted successfully" };
    } catch (error) {
        if (error instanceof ErrorCustom) throw error
        throw new ErrorCustom(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};