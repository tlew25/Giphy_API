//=================START OF GIPHY API
var topics = [
  "Kendrick Lamar",
  "Jay Z",
  "Biggie",
  "Lil Wayne",
  "Andre 3000",
  "J. Cole",
  "Drake",
  "Young Thug",
  "Kanye",
  "Kid Cudi"
];

$(document).on("click", "button", function() {
  var topicRap = $(this).attr("data-person");

  //===================API Query Here
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    topicRap +
    "&api_key=LWk0oT26jRzBHCxHax6FFYCPT3jl0DvB&limit=10";

  $.ajax({
    url: queryURL, ///it is referring to the query with the api key
    method: "GET"
  }).then(function(response) {
    //promise is located here
    console.log(response.data);

    var imgResult = response.data;

    $("#rapImages").empty();
    for (var i = 0; i < imgResult.length; i++) {
      var rapGif = $("<div>");
      rapGif.attr({
        class: "rap-div"
      });
      //====================Rap Rating Retrieval
      var rapRating = imgResult[i].rating;

      var rapParagraph = $("<p>").text("Rating: " + rapRating);
      //====================Image state

      var rapperImage = $(
        "<img src='" + response.data[i].images.fixed_height_still.url + "'>"
      );
      rapperImage.attr({
        "data-state": "still",
        "data-still": response.data[i].images.fixed_height_still.url,
        "data-animate": response.data[i].images.fixed_height.url
      });

      rapGif.prepend(rapParagraph);
      
      rapGif.prepend(rapperImage);

      $("#rapImages").prepend(rapGif);
    }
  });
});

function newGifButton() {
  $("#gifButtons").empty();
  $("#rapImages").empty();

  for (i = 0; i < topics.length; i++) {
    var topicBtn = $("<button>").text(topics[i]);

    topicBtn.attr("data-person", topics[i]);

    $("#gifButtons").append(topicBtn);
  }
}

$(document).on("click", "img", function() {
  
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

$("#rapSubmit").on("click", function(event) {
  event.preventDefault();

  var newRapper = $("#rapper-input")
    .val()
    .trim();

  topics.push(newRapper);
  var name = $("<p>");
  name.text(newRapper);

  newGifButton();
});

newGifButton();
