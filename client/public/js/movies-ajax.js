var apikey = "539ccda6c942a1dfd00efc7df43be0d1"




$(document).ready(function () {

    // these will be buttons most likely
    var getRecommended = $(".rec-movies");
    var searchMovies = $("#movie-search");
    var nowPlaying = $(".now-playing");
    // search box for movies
    var movieInput = $("#movie-search-title");


    // ajax for searching a specific movie that the user can then vote on
    searchMovies.on("submit", function (event) {

        var movieInputVal = movieInput.val();
        event.preventDefault();
        var queryURL = "https://api.themoviedb.org/3/search/movie?api_key=" + apikey + "&language=en-US&query=" + movieInputVal + "&page=1";
        $.ajax({
            url: queryURL,
            method: "GET"
<<<<<<< HEAD
        }).then(function (results) {
            console.log(results);
            // do stuff with the results here (fill divs add info elsewhere etc)
        }).catch(function (err) {
=======
        }).then(function(result){
            console.log(result);
            
            for(var i = 0; i<5;i++){
            var moviePoster = result.results[i].poster_path;
            var movieTitle = result.results[i].title;
            var movieId = result.results[i].id;

            // do stuff with the results here (fill divs add info elsewhere etc)
            var mediaDiv = $("<div>");
            mediaDiv.attr("class", "media");
            var imgDiv = $("<img>");
            var imgLink = $("<a>");
            imgLink.attr("href", "/movie/" + movieId);
            imgDiv.attr("src", "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + moviePoster);
            imgLink.append(imgDiv);
           
            mediaDiv.append(imgLink);

            var mediaBody = $("<div>");
            mediaBody.attr("class", "media-body");
            var titleHeader = $("<h5>");
            titleHeader.text(movieTitle);
            mediaBody.append(titleHeader);
            mediaDiv.append(mediaBody);

            $("#searchResults").append(mediaDiv);

            }
        }).catch(function(err){
>>>>>>> origin/master
            if (err) throw err;
            console.log(err);
        })
    })

    // NOW PLAYING AJAX
    // when we click the button to search for the current playing movies
    // if it just shows now playing when we load the page, we'll get rid of the on click method
    nowPlaying.on("click", function (event) {
        event.preventDefault();
        // building the url for the ajax
        var queryURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + apikey + "&language=en-US&page=1";

        // ajax for now playing movies
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (result) {
            console.log(result);
            // do shit with the data we get back
            // prob store data in our database here using associations?

            for (var i = 0; i < 5; i++) {
                var movieTitle = result.results[i].title;
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
        }).catch(function (err) {
            if (err) throw err;
            console.log(err);
        });
    });

    // recommended movie button ajax
    getRecommended.on("click", function (event) {
        // movieId is from the searched movie 
        var movieId;

        event.preventDefault();
        var queryURL = "https://api.themoviedb.org/3/movie/" + movieId + "/recommendations?api_key=" + apikey + "&language=en-US&page=1"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (results) {
            console.log(results);
            // do more shit with the results from this ajax
        }).catch(function (err) {
            if (err) throw err;
            console.log(err);
        })

    })



})