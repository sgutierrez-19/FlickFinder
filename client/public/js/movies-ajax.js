var apikey = "539ccda6c942a1dfd00efc7df43be0d1"




$(document).ready(function(){
    
    // these will be buttons most likely
    var getRecommended = $(".rec-movies");
    var searchMovies = $(".movies-search");
    var nowPlaying = $(".now-playing");
    // the value of the search movies text box called movie-input
    var movieInput = $(".movie-input").val();

    // ajax for searching a specific movie that the user can then vote on
    searchMovies.on("click", function(event){
        event.preventDefault();
        var queryURL = "https://api.themoviedb.org/3/search/movie?api_key=" + apikey + "&language=en-US&query=" + movieInput + "&page=1";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(results){
            console.log(results);
            // do stuff with the results here (fill divs add info elsewhere etc)
        }).catch(function(err){
            if (err) throw err;
            console.log(err);
        })
    })
    
    // NOW PLAYING AJAX
    // when we click the button to search for the current playing movies
    // if it just shows now playing when we load the page, we'll get rid of the on click method
    nowPlaying.on("click", function(event){
        event.preventDefault();
        // building the url for the ajax
        var queryURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + apikey + "&language=en-US&page=1";
        
        // ajax for now playing movies
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(result){
            console.log(result);
            // do shit with the data we get back
            // prob store data in our database here using associations?

            for (var i = 0; i<5; i++){
                var movieTitle = result.results[i].title;
                var movieId = result.results[i].id;
                var moviePlot = result.results[i].overview;
                var moviePoster = result.results[i].poster_path;

                var npDiv = $("<div>");
                npDiv.attr("data-title", movieTitle);
                npDiv.attr("data-id", movieId);
                npDiv.attr("data-plot", moviePlot);
                npDiv.attr("data-poster", moviePoster);

                var txtDiv = $("<div>");
                var h1Title = $("<h1>");
                
                
                console.log(movieTitle);
            }
       
       
        }).catch(function(err){
            if (err) throw err;
            console.log(err);
        });


    });
    // recommended movie button ajax
    getRecommended.on("click", function(event){
        // movieId is from the searched movie 
        var movieId;
        
        event.preventDefault();
        var queryURL = "https://api.themoviedb.org/3/movie/" + movieId + "/recommendations?api_key=" + apikey+ "&language=en-US&page=1"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(results){
            console.log(results);
            // do more shit with the results from this ajax
        }).catch(function(err){
            if (err) throw err;
            console.log(err);
        })
    
    })



})