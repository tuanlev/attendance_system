/**
 * config/connection.js
 */

const mysql = require('mysql2/promise');
const fs = require('fs');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'attendance',
  waitForConnections: true,
  connectionLimit: 10,
  multipleStatements: true,
});

(async () =>{
  try {
    const sql = fs.readFileSync('./database/schema.sql', 'utf8');
    await pool.query(sql);
    console.log('✅ SQL file executed with POOL!');
  } catch (err) {
    console.error('❌ SQL file failed:', err.message);
    process.exit(1);
  }
})()

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Pool connected!');
    connection.release();
  } catch (err) {
    console.error('❌ Pool connection failed:', err.message);
    process.exit(1);
  }
}

module.exports = { pool, testConnection };
