const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config();

const userRoutes = require(__dirname + "/routes/user.js");
const mapRoutes = require(__dirname + "/routes/map.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/user", userRoutes);
app.use("/map", mapRoutes);

// const MONGO_DB_URL = ""
// mongoose.connect(MONGO_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
// .then(() => console.log("MongoDB connected..."))
// .catch(err => console.log(err))
// mongoose.set("useFindAndModify", false);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));