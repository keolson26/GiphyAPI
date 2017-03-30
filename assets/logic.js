var topics = ["Gob Bluth", "Daria", "Shaq", "Zoidberg", "Chris Farley", "Liz Lemon", "Ron Burgundy", "Monty Burns", "Leslie Knope", "Drake"];
var displayCount = 10;


function displayGif() {

    $("#gif-view").empty();

    var searchContent = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchContent + "&limit=12&api_key=dc6zaTOxFJmzC";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {

        for (var i = 0; i < response.data.length; i++) {
            var stillURL = response.data[i].images.original_still.url;
            var activeURL = response.data[i].images.original.url;
            var gifTag = $("<img>");

            gifTag.addClass("pic");
            gifTag.attr("data-active", activeURL);
            gifTag.attr("data-still", stillURL);
            gifTag.attr("src", stillURL);
            gifTag.attr("alt", "GIF");

            $("#gif-view").append(gifTag);
        }
    });

    function activateGif() {

        var activeSRC = $(this).attr("data-active");
        var newTag = $("<img>");

        console.log(this);
        console.log(activeSRC);

        $(this).attr("src", activeSRC);

        $(document).on("click", ".pic", stopGif);

        function stopGif() {

            var stillSRC = $(this).attr("data-still");
            var stopTag = $("<img>");

            console.log(this);

            $(this).attr("src", stillSRC);
        }
    }


    $(document).on("click", ".pic", activateGif);

}

//Creates buttons
function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < topics.length; i++) {

        var a = $("<button>");
        a.addClass("person");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons-view").append(a);
    }
}

//Adds button based on user input
$("#addBtn").on("click", function (event) {

    console.log("clicked");

    event.preventDefault();

    var newPerson = $("#term").val().trim()

    topics.push(newPerson);
    console.log(topics);

    renderButtons();
});

//Shows GIF of clicked person
$(document).on("click", ".person", displayGif);

//Show original button set
renderButtons();


