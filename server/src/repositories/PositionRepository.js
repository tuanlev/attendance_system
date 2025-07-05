const { pool } = require('../config/Connection');
const ErrorHandling = require('../ErrorHandling/ErrorHandling');
const Position = require('../model/Position');
const { ReasonPhrases, StatusCodes } = require('http-status-codes');

exports.createPosition = async (position) => {
    const check = await this.findPositionByName(position.name);
    if (check[0]) throw new ErrorHandling(StatusCodes.CONFLICT, "Position name already exists");
    try {
        const [result] = await pool.query(
            'INSERT INTO positions (name) VALUES (:name)',
            position
        );
        const [rows] = await pool.query(
            'SELECT id, name, updated_at FROM positions WHERE id = ?',
            [result.insertId]
        );
        return rows[0];
    } catch (error) {
        if (error instanceof ErrorHandling) throw error
        throw new ErrorHandling(StatusCodes.INTERNAL_SERVER_ERROR, error.message+'this');
    }
};

exports.findPositionByName = async (name) => {
    try {
        const [rows] = await pool.query('SELECT id, name FROM positions WHERE name = ?', [name]);
        return rows;
    } catch (error) {
        throw new ErrorHandling(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.findPositionById = async (id) => {
    try {
        const [rows] = await pool.query(
            'SELECT id, name, updated_at FROM positions WHERE id = :id',
            { id }
        );
        return rows[0] || null;
    } catch (error) {
        if (error instanceof ErrorHandling) throw error
        throw new ErrorHandling(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.getPositions = async (keyword) => {
    try {
        let query = 'SELECT id, name, updated_at FROM positions';
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
exports.updatePositionById = async (id, position) => {
    try {
        // Kiểm tra tên phòng ban đã tồn tại cho id khác chưa
        if (position.name) {
            const [check] = await pool.query(
                'SELECT id FROM positions WHERE name = :name AND id != :id',
                { name: position.name, id }
            );
            if (check[0]) {
                throw new ErrorHandling(StatusCodes.CONFLICT, "Position name already exists");
            }
        }

        // Cập nhật phòng ban
        const [result] = await pool.query(
            'UPDATE positions SET name = :name WHERE id = :id',
            { ...position, id }
        );

        if (result.affectedRows === 0) {
            throw new ErrorHandling(StatusCodes.NOT_FOUND, "Position not found");
        }

        // Trả về thông tin phòng ban sau khi cập nhật
        const [rows] = await pool.query(
            'SELECT id, name, updated_at FROM positions WHERE id = :id',
            { id }
        );
        return rows[0];
    } catch (error) {
        if (error instanceof ErrorHandling) throw error
        throw new ErrorHandling(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};
exports.deletePositionById = async (id) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM positions WHERE id = :id',
            { id }
        );
        if (result.affectedRows === 0) {
            throw new ErrorHandling(StatusCodes.NOT_FOUND, "Position not found");
        }
        return { message: "Position deleted successfully" };
    } catch (error) {
        if (error instanceof ErrorHandling) throw error
        throw new ErrorHandling(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};