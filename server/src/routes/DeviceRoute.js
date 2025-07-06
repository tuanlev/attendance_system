const deviceController = require("../controller/DeviceController");

const deviceRoute = require("express").Router();
deviceRoute.get("/",deviceController.getDevices);
deviceRoute.post("/",deviceController.addDevice)
deviceRoute.patch("/:device_id",deviceController.updateDevice)
deviceRoute.get("/:device_id",deviceController.getDeviceById)
deviceRoute.delete("/:device_id",deviceController.deleteDevice)

module.exports = deviceRoute;