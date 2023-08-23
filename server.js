const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");

// Always require and configurate near the top
require("dotenv").config();

require("./config/database");

const app = express();

app.use(logger("dev"));
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

// Middleware to check and verify a JWT and
// assign the user object from the JWT to req.user
app.use(require("./config/checkToken"));

// Put API routes here, before the "catch all" route
app.use("/api/users", require("./routes/api/users"));
const ensureLoggedIn = require("./config/ensureLoggedIn");
app.use("/api/notes", ensureLoggedIn, require("./routes/api/notes"));

// sei.com/order/
app.get("/order/:id", function (req, res) {
  // return JSON
});

// sei.com/dashboard
// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
