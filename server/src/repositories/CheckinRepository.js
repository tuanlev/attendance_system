
const { pool } = require('../config/Connection');
const ErrorCustom = require('../errorcustom/ErrorCustom');
const Department = require('../model/Department');
const { ReasonPhrases, StatusCodes } = require('http-status-codes');
const { createShiftRecord } = require('./ShiftRecordRepository');

exports.getCheckins = async (query = {},device_id) => {
 let whereClause = `WHERE d.id = :device_id `

if (query.position_id) {
  whereClause += ` AND e.position_id = :position_id`;
}

if (query.department_id) {
  whereClause += ` AND e.department_id = :department_id`;
}


  const sql = `
    SELECT
      c.external_id AS checkin_ex_id,
      c.checkin_at AS checkin_time,
      c.faceBase64 AS checkin_face,
      e.external_id AS employee_ex_id,
      e.fullname AS employee_name,
      d.name AS device_name,
      d.external_id AS device_ex_id,
      dept.name AS department_name,
      p.name AS position_name
    FROM
      checkins c
      LEFT JOIN employees e ON c.employee_ex_id = e.external_id
      LEFT JOIN devices d ON c.device_ex_id = d.external_id
      LEFT JOIN departments dept ON e.department_id = dept.id
      LEFT JOIN positions p ON e.position_id = p.id
      
    ${whereClause}
     
    ORDER BY c.updated_at DESC
  `;
   console.log(sql,{...query,device_id})
  const [rows] = await pool.query(sql, {...query,device_id});
  return rows;
};
exports.addCheckin = async (checkin) => {
  try {
    console.log(checkin)
    const [result] = await pool.query(
      `INSERT INTO checkins 
        (external_id, device_ex_id, employee_ex_id, checkin_at, faceBase64)
       VALUES 
        (:external_id, :device_ex_id, :employee_ex_id, :checkin_at, :faceBase64)`,
      checkin
    );
   await createShiftRecord(checkin)
   const [rows] = await pool.query(
  `
  SELECT
    c.external_id AS checkin_ex_id,
    c.checkin_at AS checkin_time,
    c.faceBase64 AS checkin_face,
    e.external_id AS employee_ex_id,
    e.fullname AS employee_name,
    d.name AS device_name,
    d.external_id AS device_ex_id,
    dept.name AS department_name,
    p.name AS position_name
  FROM
    checkins c
    LEFT JOIN employees e ON c.employee_ex_id = e.external_id
    LEFT JOIN devices d ON c.device_ex_id = d.external_id
    LEFT JOIN departments dept ON e.department_id = dept.id
    LEFT JOIN positions p ON e.position_id = p.id
  WHERE
    c.id = ?
  `,
  [result.insertId]
);

    return rows[0];
  } catch (error) {
    if (error instanceof ErrorCustom) throw error;
    throw new ErrorCustom(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};
