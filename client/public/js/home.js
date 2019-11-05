var apikey = "539ccda6c942a1dfd00efc7df43be0d1"
var nowPlaying = $(".now-playing");
var movieInput = $("#movie-search-title");



$.ajax({
    url: "https://api.themoviedb.org/3/movie/now_playing?api_key=" + apikey + "&language=en-US&page=1",
    method: "GET"
}).then(function (result) {
    console.log(result);
    

    for (var i = 0; i < 5; i++) {
        var movieTitle = result.results[i].title;
        var movieId = result.results[i].id;
        var moviePlot = result.results[i].overview;
        var moviePoster = result.results[i].poster_path;

        var npDiv = $("<div>");
        var imgLink = $("<a>");
        var npImg = $("<img>");

        npDiv.attr("class", "card col-md-2");        
        imgLink.attr("href", "/movie/" + movieId);
        npImg.attr("class", "img-fluid");
        npImg.attr("src", "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + moviePoster);

        imgLink.append(npImg);
        npDiv.append(imgLink);

        $("#npContainer").append(npDiv);
    }
}).catch(function (err) {
    if (err) throw err;
    console.log(err);
});


