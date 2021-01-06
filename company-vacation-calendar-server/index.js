const express = require("express");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const compression = require("compression");
const apiRouter = require("./api-routing");

const app = express();
// Static Middleware
app.use(express.static(path.join(__dirname, "public")));

// View Engine Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Log every request to the console
app.use(morgan("dev"));

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

// Initialize firebase communications
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Start server and listen on port
var port = process.env.PORT || 3117;
app.use("/api", apiRouter);
app.listen(port);
console.log("Magic happens on port " + port);

// Show home static page
app.get("/", function (req, res) {
  res.render("Home");
});
