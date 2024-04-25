const express = require("express");
const dbConn = require("./utils/dbconn.js");
const cors = require("cors");
const userRoutes = require("./routes/user.route.js");
const pinRoutes = require("./routes/pin.route.js");
require("dotenv").config();

// application instance initialization
const app = express();

// Allow user to send data in json format
app.use(express.json());

// App uses cors to allow connection from client
app.use(cors());

// API entry point
app.get(process.env.BASEURL, (req, res) => {
  res.send("Application up and running");
});

// API user routes
app.use(`${process.env.BASEURL}/users`, userRoutes);

// API pin routes
app.use(`${process.env.BASEURL}/pins`, pinRoutes);

app.use("/*", (req, res) => {
  res.send("All systems normal");
});

// database connection.
// *app* is passed as argument which is used to run the application in dbConn
dbConn(app);
