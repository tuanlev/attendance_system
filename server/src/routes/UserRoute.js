const userController = require("../controller/UserController");

const userRoute = require("express").Router();
userRoute.post("/login",userController.login);
userRoute.post("/register",userController.register)


module.exports = userRoute;