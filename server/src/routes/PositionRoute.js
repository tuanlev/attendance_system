const positionController = require("../controller/PositionController");

const positionRoute = require("express").Router();
positionRoute.get("/",positionController.getPositions);
positionRoute.post("/",positionController.addPosition)
positionRoute.patch("/:positionId",positionController.updatePosition)
positionRoute.get("/:positionId",positionController.getPositionById)
positionRoute.delete("/:positionId",positionController.deletePosition)

module.exports = positionRoute;