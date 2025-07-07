const { pool } = require('../config/Connection');
const ErrorCustom = require('../errorcustom/ErrorCustom');
const { StatusCodes } = require('http-status-codes');
const { passwordEncoder } = require('../security/PasswordHashing');

exports.createUser = async (user) => {
    const check = await exports.findUserByUsername(user.username);
    if (check) throw new ErrorCustom(StatusCodes.CONFLICT, "Username already exists");
    try {
        const [result] = await pool.query(
            'INSERT INTO users (username, password, device_id) VALUES (:username, :password, :device_id)',
            user
        );
        const [rows] = await pool.query(
            'SELECT id, username,device_id, updated_at FROM users WHERE id = :id',
            { id: result.insertId }
        );
        return rows[0];
    } catch (error) {
        throw new ErrorCustom(StatusCodes.INTERNAL_SERVER_ERROR, error.message+"this");
    }
};

exports.findUserByUsername = async (username) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE username = :username',
            { username }
        );
        return rows[0];
    } catch (error) {
        throw new ErrorCustom(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.findUserById = async (id) => {
    try {
        const [rows] = await pool.query(
            'SELECT id, username, device_id,  updated_at FROM users WHERE id = :id',
            { id }
        );
        return rows[0] || null;
    } catch (error) {
        throw new ErrorCustom(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.getUsers = async (keyword) => {
    try {
        let query = 'SELECT id, username, device_id,  updated_at FROM users';
        let params = {};
        if (keyword && keyword.toString().trim()) {
            query += ' WHERE username LIKE :keyword';
            params.keyword = `%${keyword.trim()}%`;
        }
        query += ' ORDER BY updated_at DESC';
        const [rows] = await pool.query(query, params);
        return rows;
    } catch (error) {
        throw new ErrorCustom(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.updateUserById = async (id, user) => {
    try {
        if (user.username) {
            const [check] = await pool.query(
                'SELECT id FROM users WHERE username = :username AND id != :id',
                { username: user.username, id }
            );
            if (check[0]) {
                throw new ErrorCustom(StatusCodes.CONFLICT, "Username already exists");
            }
        }
        const [result] = await pool.query(
            'UPDATE users SET username = :username, password = :password, device_id = :device_id, employee_id = :employee_id WHERE id = :id',
            { ...user, id }
        );
        if (result.affectedRows === 0) {
            throw new ErrorCustom(StatusCodes.NOT_FOUND, "User not found");
        }
        const [rows] = await pool.query(
            'SELECT id, username, device_id,  updated_at FROM users WHERE id = :id',
            { id }
        );
        return rows[0];
    } catch (error) {
        throw new ErrorCustom(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.resetPasswordUsersById = async (id) => {
    try {
        const pw = process.env.PASSWORD_RESET || '12345678';
        const hashpassword = passwordEncoder(pw);
        const [result] = await pool.query(
            'UPDATE users SET password = :password WHERE id = :id',
            { password:hashpassword,id }
        );
        if (result.affectedRows === 0) {
            throw new ErrorCustom(StatusCodes.NOT_FOUND, "User not found");
        }
        const [rows] = await pool.query(
            'SELECT id, username, device_id,  updated_at FROM users WHERE id = :id',
            { id }
        );
        return rows[0];
    } catch (error) {
        throw new ErrorCustom(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};
exports.changeDeviceUser = async (id,device_id) => {
    try {
        device_id = (device_id)?device_id:null;
        const pw = process.env.PASSWORD_RESET || '12345678';
        const hashpassword = passwordEncoder(pw);
        const [result] = await pool.query(
            'UPDATE users SET device_id = :device_id WHERE id = :id',
            { device_id,id }
        );
        if (result.affectedRows === 0) {
            throw new ErrorCustom(StatusCodes.NOT_FOUND, "User not found");
        }
        const [rows] = await pool.query(
            'SELECT id, username, device_id,  updated_at FROM users WHERE id = :id',
            { id }
        );
        return rows[0];
    } catch (error) {
        throw new ErrorCustom(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};

exports.deleteUserById = async (id) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM users WHERE id = :id',
            { id }
        );
        if (result.affectedRows === 0) {
            throw new ErrorCustom(StatusCodes.NOT_FOUND, "User not found");
        }
        return { message: "User deleted successfully" };
    } catch (error) {
        throw new ErrorCustom(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
};