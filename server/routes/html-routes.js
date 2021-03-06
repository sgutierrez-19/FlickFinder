const router = require("express").Router();
const db = require("../models");
const axios = require("axios");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get("/", function (req, res) {
  res.render("index", {  });
});

router.get("/home", isAuthenticated, function (req, res) {

  db.Movie.findAll({
    where: {
      UserId: req.user.id
    }
  })
    .then(function (result) {
      if (result.length > 0) {
        var randomIndex = Math.floor(Math.random() * result.length);
        var movieId = result[randomIndex].movie_id;
        var originalTitle = result[randomIndex].movie_title;
        
        var apikey = "539ccda6c942a1dfd00efc7df43be0d1";

        var queryURL = "https://api.themoviedb.org/3/movie/" + movieId + "/recommendations?api_key=" + apikey + "&language=en-US&page=1";

        axios.get(queryURL)
          .then(function (result) {
            var data = {
              recMovies: [],
              originalTitle: originalTitle
            };

            for (var i = 0; i < 5; i++) {
              let currentMovie = {
                poster_path: result.data.results[i].poster_path,
                title: result.data.results[i].title,
                release_date: result.data.results[i].release_date,
                overview: result.data.results[i].overview,
                movieid: result.data.results[i].id,
              }
              data.recMovies.push(currentMovie);
            }
            res.render("home", data);
          })
      } else {
        res.render("home", {});
      }     
    }).catch(function (err) {
      res.status(500).json(err);
    });
});

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get("/movie/:movieid", isAuthenticated, function (req, res) {
  var apikey = "539ccda6c942a1dfd00efc7df43be0d1";
  var queryURL = "https://api.themoviedb.org/3/movie/" + req.params.movieid + "?api_key=" + apikey + "&language=en-US";

  axios.get(queryURL)
    .then(function (response) {
      let singleMovie = {
        poster_path: response.data.poster_path,
        title: response.data.title,
        release_date: response.data.release_date,
        overview: response.data.overview,
        movieid: response.data.id,
      }

      res.render("movie", { singleMovie });
    })
    .catch(function (error) {
    })
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