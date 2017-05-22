var isFirstSearch = true;

$(document).ready(function() {
  $("#search-btn").on("click", function(event) {
    // get search term from user
    event.preventDefault();
    var keyWord = $("#inlineFormInput").val().replace("&", "+");

    // tell if no keyWord
    if (keyWord == "" || keyWord.match(/^\s+$/)) {
      alert("Keyword required to search!");
    }

    // else do a search
    else {
      $.ajax({
        url: "https://en.wikipedia.org//w/api.php?action=opensearch&format=json&origin=*&search="
              + keyWord
              + "&namespace=0&limit=10",
        type: "GET",
        dataType: "JSON",
        success: function(data) {
          showResults(data);
        }
      })
    }
  })
})

function showResults(data) {
  if (!isFirstSearch) {
    // remove previous results
    // for now log not first search
    console.log("not first search!");
  }

  // remove random-btn, move search box to top
  // for only remove
  console.log("...removing random-btn: ");
  $("#random-btn").remove();

  // generate a card element for each result
  console.log("...individual title: ");
  data[1].forEach(function(title) {
    console.log(title);
  });

  // flip isFirstSearch
  isFirstSearch = false;

  // log result for testing
  console.log("...searchResult: ");
  console.log(data);
}
