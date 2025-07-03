class Device {
  constructor({ id, external_id, name, description, updated_at }) {
    this.id = id;
    this.external_id = external_id;
    this.name = name;
    this.description = description;
    this.updated_at = updated_at;
  }
}
module.exports = Device;
