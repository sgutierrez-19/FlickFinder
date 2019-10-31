// Requiring necessary npm packages
var path = require("path");
var express = require("express");
var session = require("express-session");
var exphbs = require("express-handlebars");
// Requiring passport as we've configured it
var passport = require("./server/config/passport");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./server/models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("client/public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", exphbs({
  defaultLayout: "main",
}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "client/views"))

// Requiring our routes
const apiRoutes = require("./server/routes/api-routes.js");
app.use(apiRoutes);

const htmlRoutes = require("./server/routes/html-routes.js");
app.use(htmlRoutes);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
