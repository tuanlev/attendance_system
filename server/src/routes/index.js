
const routes = require("express").Router();

routes.use("/departments", require("./DepartmentRoute"));
routes.use("/positions",require("./PositionRoute"))
routes.use("/users", require("./UserRoute"));
routes.use("/shifts", require("./ShiftRoute"));

// routes.use("/devices", require("./device.route"));
routes.use("/employees", require("./EmployeeRoute"));
// routes.use("/checkins", require("./checkin.route"));
// routes.use("/shiftrecords", require("./shiftRecord.route"));
module.exports = routes;
