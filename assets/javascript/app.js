var gifs = ['cats', 'gecko', 'game of thrones', 'dogs']

function renderButtons() {
    $("#gif-buttons").empty();
    for (i = 0; i < gifs.length; i++) {
        $("#gif-buttons").append("<button class='btn btn-success' data-gifs='" + gifs[i] + "'>" + gifs[i] + "</button>");
    }
}

renderButtons();

$("#submit").on("click", function () {
    event.preventDefault();
    var gif = $("#gif-search").val().trim();
    gifs.push(gif);
    renderButtons();
    return;
});


$("button").on("click", function() {
    var search = $(this).text();
    $("#gifs-appear-here").empty();

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        search + "&api_key=5k7hhWkua562V2p1LNaDUemRyoDfM9w0&limit=12";

    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {
            var results = response.data;
            console.log(results);

            for (var i = 0; i < results.length; i++) {

                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                    var gifDiv = $("<div>");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var gif = $("<img>");

                    gif.addClass('gif');
                    gif.attr("src", results[i].images.fixed_height_still.url);
                    gif.attr('data-animate', results[i].images.fixed_height.url);
                    gif.attr('data-still', results[i].images.fixed_height_still.url);
                    gif.attr('date-state', 'date-still')

                    gifDiv.append(p);
                    gifDiv.append(gif);

                    $("#gifs-appear-here").prepend(gifDiv);
                }
            }

            $(".gif").on("click", function () {
                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still")
                };
            });
        });
});
