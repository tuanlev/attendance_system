
const routes = require("express").Router();

routes.use("/departments", require("./DepartmentRoute"));
routes.use("/positions",require("./PositionRoute"))
routes.use("/shifts", require("./ShiftRoute"));
routes.use("/users", require("./UserRoute"));
routes.use("/devices", require("./DeviceRoute"));
routes.use("/checkins", require("./CheckinRoute"));

// routes.use("/devices", require("./device.route"));
routes.use("/employees", require("./EmployeeRoute"));
// routes.use("/checkins", require("./checkin.route"));
routes.use("/shiftrecords", require("./ShiftRecordRoute"));
module.exports = routes;
