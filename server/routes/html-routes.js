const router = require("express").Router();
const db = require("../models");
const axios = require("axios");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

router.get("/signup", function (req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    return res.redirect("/home");
  }
  res.render("signup", { isLoggedOut: true });
});

router.get("/login", function (req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    return res.redirect("/home");
  }
  res.render("login", { isLoggedOut: true });
});

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get("/", isAuthenticated, function (req, res) {
  res.render("index", { email: req.user.email });
});

router.get("/home", isAuthenticated, function (req, res) {
  res.render("home", { email: req.user.email });
});

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get("/movie/:movieid", isAuthenticated, function (req, res) {
  var apikey = "539ccda6c942a1dfd00efc7df43be0d1"
  var queryURL = "https://api.themoviedb.org/3/movie/" + "475557" + "?api_key=" + apikey+ "&language=en-US"

  axios.get(queryURL)
  .then(function (response) {
    console.log(response.data);
    res.render("movie", response.data)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
  res.render("movie");

});

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get("/ratings", isAuthenticated, function (req, res) {

  db.Movie.findAll({
    where: {
      UserId: req.user.id
    }
  })
  .then(function (movies) {
    res.render("ratings", { movies });
  }).catch(function (err) {
    res.status(500).json(err);
  });
});

module.exports = router;