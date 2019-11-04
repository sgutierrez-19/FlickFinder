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
  
  db.Movie.findAll({
    where: {
      UserId: req.user.id
    }
  })
  .then(function (result) {
    console.log(result.length);
    if (result.length > 0){
      var randomIndex = Math.floor(Math.random() * result.length);
      
      var movieId = result[randomIndex].movie_id;
      console.log("you have a favorited movie");
      var apikey = "539ccda6c942a1dfd00efc7df43be0d1";

      var queryURL = "https://api.themoviedb.org/3/movie/" + movieId + "/recommendations?api_key=" + apikey + "&language=en-US&page=1";

      axios.get(queryURL)
        .then(function(result){
          console.log(result.data.results.length);
          
          
          for (var i = 0; i < 5; i++) {
            var movieTitle = result.data.results[i].title;
            var movieId = result.results[i].id;
            var moviePlot = result.results[i].overview;
            var moviePoster = result.results[i].poster_path;
    
            var npDiv = $("<div>");
            npDiv.attr("class", "card");
            // img div
            var npImg = $("<img>");
            npImg.attr("src", "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + moviePoster);
            npImg.attr("class", "card-img-top img-fluid");
            npDiv.append(npImg);
    
            // footer text of each card
            var npFooter = $("<div>");
            npFooter.attr("class", "card-footer");
            var npFooterTxt = $("<small>");
            npFooterTxt.attr("class", "text-muted");
            npFooterTxt.text(movieTitle);
            npFooter.append(npFooterTxt);
            npDiv.append(npFooter);
    
            $("#npContainer").append(npDiv);
        }

        })

      
    } else{
      console.log("you have none");
    }
    
    
    res.render("home", { email: req.user.email });
  }).catch(function (err) {
    res.status(500).json(err);
  });

});

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get("/movie/:movieid", isAuthenticated, function (req, res) {
  var apikey = "539ccda6c942a1dfd00efc7df43be0d1";
  var queryURL = "https://api.themoviedb.org/3/movie/" + req.params.movieid + "?api_key=" + apikey+ "&language=en-US";

  axios.get(queryURL)
  .then(function (response) {
    let singleMovie = {
      poster_path: response.data.poster_path,
      title: response.data.title,
      release_date: response.data.release_date,
      overview: response.data.overview,
      movieid: response.data.id,
    }

    res.render("movie", { singleMovie } );
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  // .finally(function () {
  //   // always executed
  // });
  // res.render("movie", { singleMovie });

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