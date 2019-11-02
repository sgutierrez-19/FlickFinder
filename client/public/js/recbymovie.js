// getRecommended.on("click", function(event){
//     // movieId is from the searched movie 
//     var movieId;
    
//     event.preventDefault();
//     var queryURL = "https://api.themoviedb.org/3/movie/" + movieId + "/recommendations?api_key=" + apikey+ "&language=en-US&page=1"
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function(results){
//         console.log(results);
//         // do more shit with the results from this ajax
//     }).catch(function(err){
//         if (err) throw err;
//         console.log(err);
//     })

// })
// var apikey = "539ccda6c942a1dfd00efc7df43be0d1"
// var queryURL = "https://api.themoviedb.org/3/movie/" + {{this.singleMovie.id}} + "/recommendations?api_key=" + apikey+ "&language=en-US&page=1"

// // ajax for now playing movies
// $.ajax({
//     url: queryURL,
//     method: "GET"
// }).then(function (result) {
//     console.log(result);
//     // do shit with the data we get back
//     // prob store data in our database here using associations?

//     for (var i = 0; i < 5; i++) {
//         var movieTitle = result.results[i].title;
//         var movieId = result.results[i].id;
//         var moviePlot = result.results[i].overview;
//         var moviePoster = result.results[i].poster_path;

//         var npDiv = $("<div>");
//         npDiv.attr("class", "card");
//         // img div
//         var npImg = $("<img>");
//         npImg.attr("src", "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + moviePoster);
//         npImg.attr("class", "card-img-top img-fluid");
//         npDiv.append(npImg);

//         // footer text of each card
//         var npFooter = $("<div>");
//         npFooter.attr("class", "card-footer");
//         var npFooterTxt = $("<small>");
//         npFooterTxt.attr("class", "text-muted");
//         npFooterTxt.text(movieTitle);
//         npFooter.append(npFooterTxt);
//         npDiv.append(npFooter);

//         $("#npContainer").append(npDiv);
//     }
// }).catch(function (err) {
//     if (err) throw err;
//     console.log(err);
// });