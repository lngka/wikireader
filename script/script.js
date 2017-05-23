var isFirstSearch = true;
var cardArray = [];

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
  console.log("================SEARCH STARTED====================================");

  if (!isFirstSearch) {
    // remove previous results
    console.log("not first search!");
    cardArray.forEach(function(card){
      card.remove();
    })
  }

  // log data for testing
  console.log("...search results in following object: ");
  console.log(data)

  // remove random-btn, move search box to top
  // for now only remove
  console.log("...removing random-btn: ");
  $("#random-btn").remove();

  // generate a card element for each result
  for (var i = 0; i < data[1].length; i++) {
    // clone a card
    var newCard = document.getElementById("dummyCard").cloneNode(true);
    // remember clone to delete for next search
    cardArray.push(newCard);

    //put contents in
    newCard.querySelector("h4").innerHTML = data[1][i];
    newCard.querySelector("p").innerHTML = data[2][i];
    newCard.querySelector("a").setAttribute("href", data[3][i]);

    // display card
    newCard.style.display = "flex";
    document.getElementById("results").appendChild(newCard);
  }


  //test putting first result in placeholder
  // $(".card-block h4").html(data[1][0]);
  // $(".card-block p").html(data[2][0]);
  // $(".card-block").attr("href",data[3][0])
  // flip isFirstSearch
  isFirstSearch = false;

  ;
}
