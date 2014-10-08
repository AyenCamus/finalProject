$(document).ready(function() {
  
  //everything slides in on page load
  $("#header").hide();
  $("#header").slideDown("slow");
  $("infoTab").slideDown("slow");
  $("#stickContainer").hide();
  $("#stickContainer").slideDown("slow");
  $("#input1").focus();
  $detachedButton = $("#newNumButton").detach();
  $detachedInfoText = $("#infoText").detach();
  $detachedKeyText = $("#keyText").detach();
  $detachedAboutText = $("#aboutText").detach();
    //create stick divs
    var numSticks = 100
    for (var i = 0; i < numSticks; i++) {
      $("#stickContainer").append("<div class='stickDivs' id='" + i + "'></div>");
    }
    //finished creating sticks
  //finished loading page

  //animation for info tab on hover
  $("#infoTab").mouseenter(function() {
    $("#infoTab").css("z-index", "1000");
    $(this).animate({
      height: '27%',
      width: '30%'
    });
    $("#infoTab").append($detachedInfoText);
    $("#infoText").delay(400).fadeTo("fast", 1);
  });

  $("#infoTab").mouseleave(function() {
    $("#infoText").fadeTo(100, 0);
    setTimeout(function() {
      $("#infoText").detach();
    }, 100);
    $(this).delay(200).animate({
      height: '3.5%',
      width: '6.25%'
    }); 
    setTimeout(function() {
      $("#infoTab").css("z-index", "1");
    },1000);
  });
  //end info tab animation

  //animation for key tab on hover
  $("#keyTab").mouseenter(function() {
    $("#keyTab").css("z-index", "1000");
    $(this).animate({
      height: '20%',
      width: '21%'
    });
    $("#keyTab").append($detachedKeyText);
    $("#keyText").delay(400).fadeTo("fast", 1);
  });

  $("#keyTab").mouseleave(function() {
    $("#keyText").fadeTo(100, 0);
    setTimeout(function() {
      $("#keyText").detach();
    }, 100);
    $(this).delay(200).animate({
      height: '3.5%',
      width: '8.5%'
    }); 
    $("#keyTab").css("z-index", "1");
  });
  //end key tab animation

  //animation for about tab on hover
  $("#aboutTab").mouseenter(function() {
    $("#aboutTab").css("z-index", "1000");
    $(this).animate({
      height: '16.25%',
      width: '13.5%'
    });
    $("#aboutTab").append($detachedAboutText);
    $("#aboutText").delay(400).fadeTo("fast", 1);
  });

  $("#aboutTab").mouseleave(function() {
    $("#aboutText").fadeTo(100, 0);
    setTimeout(function() {
      $("#aboutText").detach();
    }, 100);
    $(this).delay(200).animate({
      height: '3.5%',
      width: '6.25%'
    });
    $("#aboutTab").css("z-index", "1");   
  });
  //end about tab animation

  //when the "reset" button is clicked
  var resetGame = function() {
    $(".stickDivs").removeClass("glow");
    $(".glowRed").addClass("stickDivs").removeClass("glowRed");
    $(".stickDivs").css("background-color", "#211b8f");
    $("#foundIn").delay(1000).fadeTo("slow", 0);
    $("#yourNumber").delay(1500).animate({
            "marginTop": "7%"
          });
    $("#yourNumber").fadeTo("slow", 0);
    $("#stickContainer").after($detachedUserInput);
    $("#userInput").delay(1000).fadeTo("slow", 1);
    $("#newNumButton").hide();
    $("#input1").focus();
  }
  //finished resetting game

  //define search function
  var start = 0;
  var end = 99;
  var counter = 0;
  var performSearch = function() {
    counter += 1;
    setTimeout(function () {
      var half = Math.floor((end - start) / 2) + start;
      if (half === userNum) {
        $("#" + half).removeClass("stickDivs");
        $(".stickDivs").css("background-color", "#bbd3db");
        $("#yourNumber").delay(1000).animate({
          "marginTop": "75px"
        });
        if (counter === 1) {
          $("#foundIn").replaceWith("<p id='foundIn'>FOUND IN <span id='counter'>" + counter + "</span> MOVE</p>");
          $("#foundIn").delay(1500).fadeTo("slow", 1);
        } else {
          $("#foundIn").replaceWith("<p id='foundIn'>FOUND IN <span id='counter'>" + counter + "</span> MOVES</p>");
          $("#foundIn").show().delay(1500).fadeTo("slow", 1);
        }
        $("#stickContainer").after($detachedButton);
        $("#newNumButton").delay(2300).fadeTo("fast", 1);
        $("#newNumButton").click(function() {
          resetGame();
        });
        return;          
      }
      if (userNum < half) {
        for (var i = half; i <= end; i++) {
          if (i != userNum) {
            $("#" + half).addClass("glow").fadeTo("fast", 1);             
          }
        }
        for (var i = half; i <= end; i++) {
          $("#" + i).css("background-color", "#bbd3db");
        }
        end = half - 1;
      } else {
        for (var i = half; i >= start; i--) {
          if (i != userNum) {
            $("#" + half).addClass("glow").fadeTo("fast", 1);                
          }
        }
        for (var i = half; i >= start; i--) {
          $("#" + i).css("background-color", "#bbd3db");
        }
        start = half + 1;
      }
      performSearch();
    }, 1200);
  }
  //end search
  
  //when user submits number
  $("#userInput").on("submit", function (e) {
    e.preventDefault();
    userNum = $("#input1").val() - 1; //saves the number the user enter
    if (userNum % 1 === 0 && userNum >= 0 && userNum < 100) { //make sure user imput is valid (integer from 1 to 100)
      $("#input1").val("");
      $("#" + (userNum)).addClass("glowRed").css("background-color", "red").removeClass("stickDivs").fadeTo("slow",1);
      $("#yourNumber").replaceWith("<p id='yourNumber'>Your number: <br><span id = 'enteredNum'>" + (userNum + 1) + "</span></p>");
      $("#yourNumber").fadeTo("fast", 1);
      $("#userInput").fadeTo("fast", 0);
      $detachedUserInput = $("#userInput").detach(); //so user can't enter a new number while search is running
      performSearch();
    } else {
      $("#flash").css("opacity", "1").delay(3000).fadeTo("slow", 0);
    }
  });
  //end submit response
});