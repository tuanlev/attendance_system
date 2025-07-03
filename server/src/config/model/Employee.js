class Employee {
  constructor({
    id,
    external_id,
    fullname,
    phone,
    email,
    department_id,
    position_id,
    device_ex_id,
    status,
    faceBase64,
    registered_at,
    updated_at,
  }) {
    this.id = id;
    this.external_id = external_id;
    this.fullname = fullname;
    this.phone = phone;
    this.email = email;
    this.department_id = department_id;
    this.position_id = position_id;
    this.device_ex_id = device_ex_id;
    this.status = status;
    this.faceBase64 = faceBase64;
    this.registered_at = registered_at;
    this.updated_at = updated_at;
  }
}
module.exports = Employee;
