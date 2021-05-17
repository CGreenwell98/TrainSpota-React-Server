const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const userRoutes = require(__dirname + "/routes/user.js");
const mapRoutes = require(__dirname + "/routes/map.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/map", mapRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

module.exports = app;
