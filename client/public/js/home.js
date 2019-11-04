var apikey = "539ccda6c942a1dfd00efc7df43be0d1"
var nowPlaying = $(".now-playing");
var movieInput = $("#movie-search-title");



$.ajax({
    url: "https://api.themoviedb.org/3/movie/now_playing?api_key=" + apikey + "&language=en-US&page=1",
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


