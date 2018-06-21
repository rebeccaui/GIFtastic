$(document).ready(function() {

var topics = [
    "The Office",
    "Parks and Recreation",
    "Community",
    "The Goldbergs",
];

var buttonsDiv = $("#buttonsDiv");
var gifContainer = $("#gifContainer");

var show;
var name = "";

//Loop to append a button for each string in the html
function createBtn() {
    for (i = 0; i < topics.length; i++) {
        buttonsDiv.append("<button tvShow='" + topics[i] + "'>" + topics[i] + "</button>");
    }
}
createBtn();
console.log("TV Shows: " + topics);



//Give those buttons the on click function of
$("button").on("click", function getGifs() {
    //THe variable show is given this button function and given the attribute "tvShow"
    var show = $(this).attr("tvShow");
    //The variable queryURL holds the giphy API
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    //ajax calls 10 static images of the topic clicked or submitted
    .then(function(response) {
        //set up a variable to hold the response data that comes from the API and site
        var results = response.data;
        //Build a for loop that lets the user get 10 gifs on a button click
        for (var i = 0; i <= results.length; i++) {
            //Each gif and its fields will fit into a div with the class of "gifDiv"
            var gifDiv = $("<div class='gifDiv'>");
            //A variable to hold the rating of each result for each of the TV shows
            var rating = results[i].rating;
            //Display the rating on the HTML as a paragraph
            var pRating = $("<p>").text("Rating: " + rating);
            //Give the gif elements an img tag
            var gifs = $("<img>");
            //Give the images a source attribute
            gifs.attr("src", results[i].images.fixed_height_still.url);
            //Give the gifs variable a "data-state" attr of still
            gifs.attr("data-state", "still");
            //Give the src of the gif at still and animated data-states
            gifs.attr("data-still", results[i].images.fixed_height_still.url);
            gifs.attr("data-animate", results[i].images.fixed_height.url); 
            //Make gifs active/still on click 
            gifs.click(function(){
                //The variable state will hold the individual gif's data-state attribute value
                var state = $(this).attr("data-state");
                //if the data-state value is "still"
                if (state === "still") {
                    //Change the individual gif's img src value to the animated gif url
                    $(this).attr("src", $(this).attr("data-animate"));
                    //Set the individual gif's data-state value to animate
                    $(this).attr("data-state", "animate");
                } else {
                    //Change the individual gif's img src value to the still gif url
                    $(this).attr("src", $(this).attr("data-still"));
                    //Set the individual gif's data-state value to animate
                    $(this).attr("data-state", "still");
                }
            });

            //Now append the ratings and images to the gifDivs
            gifDiv.prepend(pRating);
            gifDiv.prepend(gifs);
            $(gifContainer).prepend(gifDiv);
        }
    });


});

//Add a form to the html that takes the value from a user input box 
$("form").submit(function(event) {
    //Prevent form submission
    event.preventDefault();
    //Create a variable called userInput and store the value of the input textbox in it
    var userInput = $("#userInput").val();
    //Append userInput value to topics array
    topics.push(userInput);
    //When a show is pushed to the array, make a button for it
    buttonsDiv.append("<button tvShow='" + topics[i] + "'>" + topics[i] + "</button>");
        if ($(this).attr("tvShow") === name) {
            name = $(this).attr("tvShow");
            console.log(this);
            $("#gifDiv").html("");
            j = 10;
        } else {
            $("#gifContainer").html("Nope");
        }
    
    console.log("TV Shows: " + topics);
    console.log(topics);
});

}); // Ready function end
    
    
    /* Bonus: 
    *Repeats same 10 gifs
    *CSS
        1. Ensure your app is fully mobile responsive.
        2. Allow users to request additional gifs to be added to the page.
            Each request should ADD 10 gifs to the page, NOT overwrite the existing gifs.
        3. List additional metadata (title, tags, etc) for each gif in a clean and readable format.
        4. Include a 1-click download button for each gif, this should work across device types.
        5. Integrate this search with additional APIs such as OMDB, or Bands in Town. Be creative and build something you are proud to showcase in your portfolio
        6. Allow users to add their favorite gifs to a favorites section.
            This should persist even when they select or add a new topic.
            If you are looking for a major challenge, look into making this section persist even when the page is reloaded(via localStorage or cookies).*/
