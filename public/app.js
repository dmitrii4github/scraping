
// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
  }
});



$(document).on("click", "#scrape-new", function() {

  console.log("Clicked scrape-new button");

  // Empty the notes from the note section
  $("#article-container").empty();
  
  //Now make an ajax call to scrape
  $.ajax({
    method: "GET",
    url: "/scrape",
    success : handleData()
  });

});

$(document).on("click", "#display-articles", function() {

  $.ajax({
    method: "GET",
    url: "/articles"
  })
  .then(function(data) {
      console.log("--------------------------------------------------------");
      console.log("data:");
      console.log(data);

      for (var i=0; i < data.length; i++) {

      // The title of the article
      $("#article-container").append("<h2>" + data[i].title + "</h2>");
      // An input to enter a new title
      //$("#article-container").append("<input id='titleinput' name='title' >");
      // The title of the article
      $("#article-container").append("<a href=\""+data[i].link+"\">" + data[i].link + "</a>");
      // An input to enter a new title
      $("#article-container").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      //$("#article-containers").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#article-container").append("<button data-id='" + data[i]._id + "' id='savenote'>Save Comment</button>");
      $("#article-container").append("<button data-id='" + data[i]._id + "' id='deletenote'>Delete Comment</button>");

      console.log("Note:");
      console.log(data[i].note);

      // If there's a note in the article
      if (data[i].note) {
        console.log("There is note in the article");
        // Place the title of the note in the title input

        $.ajax({
          method: "GET",
          url: "/notes/" + data[i].note
        })
          // With that done
          .then(function(data) {
            // Log the response
            console.log(data);
            $("#titleinput").val(data.title);

            // Empty the notes section
            //$("#notes").empty();
          });


        // Place the body of the note in the body textarea
        //$("#bodyinput").val(data[i].note.body);
      }
    }
    
    })
    
  });

  function handleData() { console.log("In callback"); }


  $(document).on("click", "#clear", function() {

    console.log("Clicked clear button");
  
    // Empty the notes from the note section
    $("#article-container").empty();
    
    //Now make an ajax call to clear
    $.ajax({
      method: "PUT",
      url: "/clear"
    })
      // With that done, add the note information to the page
    .then(function() {})
    .catch(function(err) {
      // If an error occurred, log it
      console.log(err);
    });

  });


// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $("#savenote").attr("data-id");

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
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      //$("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  // $("#titleinput").val("");
  // $("#bodyinput").val("");
});

// When you click the savenote button
$(document).on("click", "#deletenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $("#deletenote").attr("data-id");

  // Run a PUT request to delete the note, using what's entered in the inputs
  $.ajax({
    method: "PUT",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      //body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  //$("#bodyinput").val("");
});
