const departmentController = require("../controller/DepartmentController");

const departmentRoute = require("express").Router();
departmentRoute.get("/",departmentController.getDepartments);
departmentRoute.post("/",departmentController.addDepartment)
departmentRoute.patch("/:department_id",departmentController.updateDepartment)
departmentRoute.get("/:department_id",departmentController.getDepartmentById)
departmentRoute.delete("/:department_id",departmentController.deleteDepartment)

module.exports = departmentRoute;