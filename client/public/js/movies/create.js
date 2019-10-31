$(document).ready(function() {
    // Getting references to our form and input
    var createCandleForm = $(".create-candle");
    var nameInput = $("#candle-name");
    var scentInput = $("#candle-scent");
    var heightInput = $("#candle-height");
  
    // When the signup button is clicked, we validate the email and password are not blank
    createCandleForm.on("submit", function(event) {
      event.preventDefault();
      var candleData = {
        name: nameInput.val().trim(),
        scent: scentInput.val().trim(),
        height: parseInt(heightInput.val().trim())
      };
  
      if (!candleData.name || !candleData.scent || !candleData.height) {
        return;
      }
      // If we have an email and password, run the createCandle function
      createCandle(candleData.name, candleData.scent, candleData.height);
      emailInput.val("");
      passwordInput.val("");
    });
  
    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function createCandle(name, scent, height) {
      $.post("/api/candles", {
        name, scent, height
      })
        .then(function() {
          window.location.replace("/candle");
          // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(handleLoginErr);
    }
  
    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }
  });
  