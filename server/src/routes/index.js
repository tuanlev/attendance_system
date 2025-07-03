
const routes = require("express").Router();

routes.use("/departments", require("./DepartmentRoute"));
// routes.use("/positions",positionRoute)
// routes.use("/auth", require("./auth.route"));
// routes.use("/users", require("./user.route"));
// routes.use("/devices", require("./device.route"));
// routes.use("/employees", require("./employee.route"));
// routes.use("/checkins", require("./checkin.route"));
// routes.use("/shiftrecords", require("./shiftRecord.route"));
module.exports = routes;
