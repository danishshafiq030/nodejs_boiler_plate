const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");

// socket file
const sockerServer = require("./socketServer");

// errorHandler middleware
const errorHandler = require("./middlewares/errorHandler");

// import db file
const connectDB = require("./config/db");

//  import Routes
const authRoute = require("./routes/authRoute");

// socket code

const corsOptions = {
  origin: "*",
  "Access-Control-Allow-Origin": "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

dotenv.config();
connectDB();

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

// all routes
app.use("/api/v1/auth", authRoute);

// socker server
const server = http.createServer(app);
sockerServer.registerSocketServer(server);

app.get("/", (req, res) => {
  res.send("App is running .... ");
});

app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server Listening on PORT :- 5000");
});
