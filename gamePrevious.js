var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    level = level + 1;
    $("h1").text("Level " + level);
    return randomNumber;
}

function playSound(name) {
    var audio = new Audio("/sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    var activeButton = $("#" + currentColor);
    activeButton.addClass("pressed");

    setTimeout(function () {
        activeButton.removeClass("pressed");
    }, 100);
}

function checkAnswer() {
    if (gamePattern[level - 1] == userClickedPattern[level - 1]) {
        var randomChosenColor = buttonColors[nextSequence()];
        gamePattern.push(randomChosenColor);

        for (var i = 0; i < gamePattern.length; i++) {
            (function (i) {
                setTimeout(function () {
                    playSound(gamePattern[i]);
                    animatePress(gamePattern[i]);
                }, 1000 * i);
            })(i);    
        }
        

    } else {
        alert("Wrong");

        gamePattern = [];
        userClickedPattern = [];
        level = 0;
        var randomChosenColor = buttonColors[nextSequence()];
        playSound(randomChosenColor);
        animatePress(randomChosenColor);

        gamePattern.push(randomChosenColor);
    }
}

$(function () {
    $(document).on("keypress", function () {
        var randomChosenColor = buttonColors[nextSequence()];
        playSound(randomChosenColor);
        animatePress(randomChosenColor);

        gamePattern.push(randomChosenColor);

        $(".btn").click(function () {
            var userChosenColour = $(this).attr("id");
            userClickedPattern.push(userChosenColour);
            playSound(userChosenColour);
            animatePress(userChosenColour);
            setTimeout(function () {
                checkAnswer();
            }, 1000);
        });
    });
});
