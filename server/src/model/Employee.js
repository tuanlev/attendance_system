function Employee({
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
  return {
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
  };
}
module.exports = Employee;
