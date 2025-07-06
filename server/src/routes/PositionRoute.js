const positionController = require("../controller/PositionController");

const positionRoute = require("express").Router();
positionRoute.get("/",positionController.getPositions);
positionRoute.post("/",positionController.addPosition)
positionRoute.patch("/:position_id",positionController.updatePosition)
positionRoute.get("/:position_id",positionController.getPositionById)
positionRoute.delete("/:position_id",positionController.deletePosition)

module.exports = positionRoute;