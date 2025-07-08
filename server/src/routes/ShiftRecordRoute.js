const shiftRecordController = require("../controller/ShiftRecordController");

const shiftRecordRoute = require("express").Router();

shiftRecordRoute.get("/", shiftRecordController.getShiftRecords);

module.exports = shiftRecordRoute;