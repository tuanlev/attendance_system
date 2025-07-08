const checkinController = require("../controller/CheckinController");

const checkinRoute = require("express").Router();
checkinRoute.get("/",checkinController.getCheckins);
module.exports =checkinRoute