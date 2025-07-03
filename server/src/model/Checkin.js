class Checkin {
  constructor({ id, external_id, checkin_at, employee_ex_id }) {
    this.id = id;
    this.external_id = external_id;
    this.checkin_at = checkin_at;
    this.employee_ex_id = employee_ex_id;
  }
}
module.exports = Checkin;
