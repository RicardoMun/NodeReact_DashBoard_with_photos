const bodyParser = require("body-parser");
const express = require("express");
const app = express();
//Get API version
const { API_VERSION } = require("./config");


// Load routings
const userRoutes = require("./src/routes/user.route");
const addressRoutes = require("./src/routes/address.route");
const categoryRoutes = require("./src/routes/category.route");
const serviceRoutes = require("./src/routes/service.route");

// Configure body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// Configure static folder
app.use(express.static("upload"));
app.use("/upload", express.static("../upload/service"));

// Configure Header HTTP
app.use(`/${API_VERSION}/address`, addressRoutes);
app.use(`/${API_VERSION}/user`, userRoutes);
app.use(`/${API_VERSION}/service`, serviceRoutes);
app.use(`/${API_VERSION}/category`, categoryRoutes);

module.exports = app;