const shiftController = require("../controller/ShiftController");

const shiftRoute = require("express").Router();

shiftRoute.get("/", shiftController.getShifts);
shiftRoute.post("/", shiftController.addShift);
shiftRoute.get("/:shiftId", shiftController.getShiftById);
shiftRoute.patch("/:shiftId", shiftController.updateShiftById);
shiftRoute.delete("/:shiftId", shiftController.deleteShiftById);

module.exports = shiftRoute;