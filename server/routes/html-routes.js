const router = require("express").Router();
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

router.get("/signup", function (req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    return res.redirect("/");
  }
  res.render("signup", { isLoggedOut: true });
});

router.get("/login", function (req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    return res.redirect("/");
  }
  res.render("login", { isLoggedOut: true });
});

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get("/", isAuthenticated, function (req, res) {
  res.render("index", { email: req.user.email });
});

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get("/candle", isAuthenticated, function (req, res) {
  db.Candle.findAll({
    where: {
      UserId: req.user.id
    }
  }).then(function (candles) {
    res.render("candle/list", { candles });
  }).catch(function (err) {
    res.status(500).json(err);
  });
});

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get("/candle/create", isAuthenticated, function (req, res) {
  res.render("candle/create");
});

module.exports = router;