// Grab the articles as a json
// $.getJSON("/articles", function(data) {
//   // For each one
//   for (var i = 0; i < data.length; i++) {
//     // Display the apropos information on the page
//     $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//   }
// });

// Whenever someone clicks a p tag

var num = 0;

$(document).on("click", "#next", function() {
  // Empty the notes from the note sectio

  $("#articles").empty();

  $.getJSON("/articles", function(data) {
      console.log("this is data")
      console.log(data)

      $("#articles").append("<p data-id='" + data[num]._id + "'>" + data[num].title + "<br />" + data[num].link + "</p>");

      
  });
  console.log("num2");
  num ++;
  console.log(num);

  return false;

});




// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .done(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + "my note" + "</h2>");
      // An input to enter a new title
      
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote' class='btn btn-success btn-lg'>Save Note</button>");
      // $("#notes").append("<button data-id='" + data._id + "' id='deletenote' class='btn btn-success btn-lg'>Delete Note</button>");



      // If there's a note in the article
      if (data.note) {
        
        $("#bodyinput").val(data.note.body);
      }
    });

    
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
