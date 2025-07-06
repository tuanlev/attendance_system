const employeeController = require("../controller/EmployeeController");

const employeeRoute = require("express").Router();

employeeRoute.get("/", employeeController.getEmployees);
employeeRoute.post("/", employeeController.addEmployee);
employeeRoute.get("/:employee_id", employeeController.getEmployeeById);
employeeRoute.get("/external/:external_id", employeeController.getEmployeeByExternalId);
employeeRoute.patch("/:employee_id", employeeController.updateEmployeeById);
employeeRoute.delete("/:employee_id", employeeController.deleteEmployeeById);

module.exports = employeeRoute;