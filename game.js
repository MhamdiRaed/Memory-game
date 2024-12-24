// declarations
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern=[];
var gamePattern = [];
var toggle=false;
var level=0;

// The actual program
$(document).keypress(function(){
    if (!toggle){
    nextSequence();}
    $("h1").text("level "+level);
    toggle=true;
})
    $(".btn").click(function(){
        var userChosenColor= $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length-1);
    })

// Functions
    function nextSequence() {
        userClickedPattern = [];
        level++;
        $("#level-title").text("Level " + level);
      
        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);
      
        $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour);
      }

    function playSound(name){
        var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();

    }
    function animatePress(currentColor) {
        $("#" + currentColor).addClass("pressed");
        setTimeout(function() {
          $("#" + currentColor).removeClass("pressed");
        }, 100);
      }
      
      function checkAnswer(currentLevel) {
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
          if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);    
          }
        } else {
            playSound("wrong");
            $("body").addClass("game-over");
            $("h1").text("Game Over!! Reload the page to restart");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);

            startOver();
          
        }
    }

    function startOver(){
      level=0;
      gamePattern=[];
      toggle=false;
    }