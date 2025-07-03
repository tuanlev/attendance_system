class ShiftAssignment {
  constructor({
    id,
    shift_id,
    employee_id,
    position,
    department,
    start_time,
    end_time,
  }) {
    this.id = id;
    this.shift_id = shift_id;
    this.employee_id = employee_id;
    this.position = position;
    this.department = department;
    this.start_time = start_time;
    this.end_time = end_time;
  }
}
module.exports = ShiftAssignment;
