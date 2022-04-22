

var buttonColors = ["red", "blue", "green", "yellow"];



function nextSequence() {
   var randomNumber = Math.floor(Math.random() * 4);
    return randomNumber;
};

var randomChosenColor = buttonColors[nextSequence()];

gamePattern = [];
gamePattern.push(randomChosenColor);


$("#"+randomChosenColor).click(function(){
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    var audio = new Audio("/sounds/"+randomChosenColor+".mp3");
    audio.play();  
});