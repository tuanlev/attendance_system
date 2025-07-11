require('dotenv').config(); 
require('./config/Connection')
const express = require("express");
const cors = require("cors");
const { errorHandling } = require("./middleware/ErrorHandling");
const authController = require("./controller/AuthController")
const routes = require("./routes");
const { tokenAuthorization } = require('./middleware/TokenAuthorization');
const app = express();
require('./config/mqtt').connect()

const server = require("http").createServer(app);
require("./config/socket").initialize(server);

// khởi tạo socket
// require("./config/socket").initialize(server);
// require("./config/db")();
// require("./config/mqtt").connect(server);
app.use(express.json())

app.use(cors({
  exposedHeaders: ['Authorization'] // 👈 cho phép frontend thấy header này
}))
// app.use(authorizeAdmin)
app.post("/login",authController.login)
app.use(tokenAuthorization)
app.use("/api",routes)
app.use(errorHandling)
server.listen(process.env.PORT || 3000, () => {
    console.log("server run on port: " + process.env.PORT || 3000)
})
