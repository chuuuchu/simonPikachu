var buttonColours = ["red" , "blue" , "green" , "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;


$("button").click(function () {
    if (!started) {
        $("level-title").text("Level " + level);
        setTimeout(function(){
            nextSequence();
            }, 500);
        started = true;
        $("button").addClass("invisible");
    }
})

$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length -1);
    console.log(userChosenColour);

});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        
        console.log("success")

        if (userClickedPattern.length === gamePattern.length) [
            setTimeout(function (){
                nextSequence();
            },1000)
        ]
    } else {

        wrongAnswer();
        console.log("wrong");
        startOver()

    }
}

function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

};

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

};

function wrongAnswer() {

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Start to Restart");
    $("button").removeClass("invisible");

}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");  
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed"); 
    }, 100);
};

function startOver() {
    level = 0
    gamePattern = [];
    started = false;
}

