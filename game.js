

buttonColors = ["red","blue", "green", "yellow"];
var level = 0;



gamePattern = [];
userClickedPattern = [];




function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);
    $("h1").text("Level "+level);
    // level = level+1;
    return randomNumber;
};


function animateFlash(colour) {
    return $("#"+colour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

};

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    
    setTimeout(function() { 
        $("#"+currentColour).removeClass("pressed");
    }, 100);
};

function playSound(colour) {
    var audio = new Audio("/sounds/"+colour+".mp3");
    audio.play();
};


function checkAnswer(){
    var number = 5;
    for (var i = 0; i < userClickedPattern.length; i++) {
        if (gamePattern[i] == userClickedPattern[i]) {
            number = 1;
        } else {
            gamePattern = [];
            userClickedPattern = [];
            $("h1").text("Press any key to start again");
            level = 0;
            return
        };
    };
    if (number = 1 && userClickedPattern.length-1 == level) {
        level=level+1;
        userClickedPattern = [];
        generateGame();
    };
};


function generateGame() {
    var randomChosenColour = buttonColors[nextSequence()];
        gamePattern.push(randomChosenColour);

        for (var i = 0; i < gamePattern.length; i++) {
            (function (i) {
                setTimeout(function () {
                    playSound(gamePattern[i]);
                    animatePress(gamePattern[i]);
                }, 400 * (i+3));
            })(i);    
        }
};
 
$(document).keypress(function(){
    generateGame();
        
});

$(".btn").click(function() {
    userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    setTimeout(function () {
        checkAnswer();
    }, 200);
});