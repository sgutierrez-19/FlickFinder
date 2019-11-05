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
        }).then(function (result) {

            for (var i = 0; i < 5; i++) {
                var moviePoster = result.results[i].poster_path;
                var movieTitle = result.results[i].title;
                var movieId = result.results[i].id;
                var movieOverview = result.results[i].overview;
                var movieReleaseDate = result.results[i].release_date;

                let searchRow = `
                <div class="row">
                    <div class="col-sm-2 offset-sm-2">
                        <a href="/movie/${movieId}"><img class="img-thumbnail" src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/${moviePoster}">  </a> 
                    </div>
                    <div class="col-sm-6">
                        <div class="row">
                            <h1 class="movie-title-search">${movieTitle}</h1>
                        </div>
                        <div class="row">
                            <h2 class="movie-date-search">${movieReleaseDate}</h2>
                            <p class="movie-overview-search">${movieOverview}</p>
                        </div>
                    </div>
                </div>`
                
                $("#searchResults").append(searchRow);
            }
        }).catch(function (err) {
            if (err) throw err;
            console.log(err);
        })
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
        }).catch(function (err) {
            if (err) throw err;
            console.log(err);
        })

    })



})