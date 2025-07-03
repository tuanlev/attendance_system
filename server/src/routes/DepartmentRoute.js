const departmentController = require("../controller/DepartmentController");

const departmentRoute = require("express").Router();
departmentRoute.get("/",departmentController.getDepartments);
departmentRoute.post("/",departmentController.addDepartment)
departmentRoute.patch("/:departmentId",departmentController.updateDepartment)
departmentRoute.get("/:departmentId",departmentController.getDepartmentById)
departmentRoute.delete("/:departmentId",departmentController.deleteDepartment)

module.exports = departmentRoute;