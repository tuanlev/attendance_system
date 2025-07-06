const userController = require("../controller/UserController");

const userRoute = require("express").Router();
userRoute.delete("/:user_id",userController.deleteUser)
userRoute.post("/login",userController.login);
userRoute.post("/register",userController.register)
userRoute.get("/",userController.getUsers)
userRoute.patch("/reset/:user_id",userController.resetPasswordUsers)
userRoute.patch("/changedevice/:user_id",userController.changeDeviceUser)

module.exports = userRoute;