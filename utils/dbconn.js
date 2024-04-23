const mongoose = require("mongoose");
require("dotenv").config();

// Create connection to database
const dbConn = (app) =>
  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: "yip",
    })
    .then(() => {
      // listen to connection
      app.listen(process.env.PORT, () => {
        console.log(`Backend service running on ${process.env.PORT}`);
      });
    })
    .catch((err) => {
      console.log(err);
    });

module.exports = dbConn;
