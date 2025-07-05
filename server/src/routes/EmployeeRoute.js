const employeeController = require("../controller/EmployeeController");

const employeeRoute = require("express").Router();

employeeRoute.get("/", employeeController.getEmployees);
employeeRoute.post("/", employeeController.addEmployee);
employeeRoute.get("/:employeeId", employeeController.getEmployeeById);
employeeRoute.get("/external/:external_id", employeeController.getEmployeeByExternalId);
employeeRoute.patch("/:employeeId", employeeController.updateEmployeeById);
employeeRoute.delete("/:employeeId", employeeController.deleteEmployeeById);

module.exports = employeeRoute;