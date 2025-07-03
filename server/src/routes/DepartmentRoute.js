const departmentController = require("../controller/DepartmentController");

const departmentRoute = require("express").Router();
departmentRoute.get("/",departmentController.getDepartments);
departmentRoute.post("/",departmentController.addDepartment)
module.exports = departmentRoute;