function User({ id, username, password, device_id, employee_id, updated_at }) {
  return {
    id,
    username,
    password,
    device_id,
    updated_at
  };
}
module.exports = User;
