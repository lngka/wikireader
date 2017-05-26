var isFirstSearch = true;
var cardArray = [];
var inlineFormInput = document.getElementById("inlineFormInput");

$(document).ready(function() {
  $("#search-btn").on("click", function(event) {
    // get search term from user
    event.preventDefault();
    var keyWord = $("#inlineFormInput").val().replace("&", "+");

    // tell if no keyWord
    if (keyWord == "" || keyWord.match(/^\s+$/)) {
      alert("Add some text friend :D");
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

  document.getElementById("inlineFormInput").onfocus = function() {
    document.getElementsByClassName("form-inline")[0].style.boxShadow = "0px 0px 15px rgba(148, 49, 38 ,1)";
  };

  document.getElementById("inlineFormInput").onblur = function() {
    document.getElementsByClassName("form-inline")[0].style["box-shadow"] = "0px 0px 10px rgba(148, 49, 38 ,0)";
  };
})

function showResults(data) {
  console.log("==========================SEARCH STARTED===============================");
  if (data[1].length === 0) {
    alert("No match");
    return;
  }

  document.getElementById("main").classList.add("goUp");
  document.getElementById("main").style["padding-top"] = "5vh";

  if (!isFirstSearch) {
    // remove previous results
    cardArray.forEach(function(card){
      card.remove();
    })
    cardArray.splice(0);
  }

  // log data for testing
  console.log("...search results in following object: ");
  console.log(data)

  // generate a card element for each result
  for (var i = 0; i < data[1].length; i++) {

    var newCard = document.getElementsByClassName("dummyCard")[0].cloneNode(true);

    // remember clone to delete for next search
    cardArray.push(newCard);

    //put contents in
    newCard.querySelector("h4").innerHTML = data[1][i];
    newCard.querySelector("p").innerHTML = data[2][i];
    newCard.querySelector("a").setAttribute("href", data[3][i]);
    newCard.style.display = "flex";
  }

  // add results one by one
  var i = 0;
  var animateResult = setInterval(function(){
    document.getElementById("results").appendChild(cardArray[i]);
    if (cardArray.length - 1 == i++) {
      var newHeight = document.getElementsByTagName("body")[0].clientHeight;
      document.getElementsByClassName("bg")[0].style.height = newHeight + "px";
      clearInterval(animateResult);
    }
  }, 200);


  // flip isFirstSearch
  isFirstSearch = false;
}
