$(document).ready(function () {

  $("").on("click", function (event) {

  });

  $("#favorite").on("click", function (event) {
    event.preventDefault();
    var newMovie = {
      movie_title: $("#movie-title").text(),
      movie_year: $("#movie-year").text(),
      overview: $("#overview").text(),
      poster_path: $(this).data("link"),
      favorited: true
    }

    $.post("/api/movies", newMovie)
      .then(function (result) {

      });
  });

  $(".remove").on("click", function (event) {
    event.preventDefault();
    var id = $(this).data("id");
    console.log("hi");

    $.ajax("/api/movies/" + id, {
      method: "DELETE"
    })
      .then(function (result) {
        location.reload();
      });
  });
});
