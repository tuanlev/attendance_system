const shiftController = require("../controller/ShiftController");

const shiftRoute = require("express").Router();

shiftRoute.get("/", shiftController.getShifts);
shiftRoute.post("/", shiftController.addShift);
shiftRoute.get("/:shift_id", shiftController.getShiftById);
shiftRoute.patch("/:shift_id", shiftController.updateShiftById);
shiftRoute.delete("/:shift_id", shiftController.deleteShiftById);

module.exports = shiftRoute;