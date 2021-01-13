const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const compression = require("compression");
const errorHandler = require("./helpers/error-handler");
const apiRouter = require("./api/api-routing");

const app = express();
// Static Middleware
app.use(express.static(path.join(__dirname, "public")));

// View Engine Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Compress requests size
app.use(compression());

// Accept bodies like application/x-www-form-urlencoded, application/json, application/vnd.api+json
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//Allow cross origin requests
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Max-Age", "3600");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  next();
});

// Global error handler
app.use(errorHandler);

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Start server and listen on port
var port = process.env.PORT || 8000;
app.use("/api", apiRouter);
app.listen(port);
console.log("Magic happens on port " + port);

// Show home static page
app.get("/", function (req, res) {
  res.render("Home");
});
