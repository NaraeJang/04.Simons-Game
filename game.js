var gamePattern = [];

/*Create A New Pattern*/
var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var level = 0;
var started = false;



$(".btn").click(function () {

    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);

    console.log(userClickedPattern);

    /* Solution A */
    // playSound(userClickedPattern[userClickedPattern.length - 1]);

    /* Solution B */
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});


$(document).keypress(function () {
    console.log("keyboard key has been pressed");


    if (!started) {
        $("#level-title").text("Let's Start!");
        setTimeout(nextSequence, 700);
        started = true;
    }
});




function nextSequence() {
    userClickedPattern.length = 0;

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    // animatePress(randomChosenColour);
};


function playSound(name) {
    /* Solution A */
    // switch (name) {
    //     case "green":
    //         var green = new Audio('sounds/green.mp3');
    //         green.play();
    //         break;

    //  case "blue":
    //         var blue = new Audio('sounds/blue.mp3');
    //         blue.play();
    //         break;

    //         case "yellow":
    //         var yellow = new Audio('sounds/yellow.mp3');
    //         yellow.play();
    //         break;

    //  case "red":
    //         var red = new Audio('sounds/red.mp3');
    //         red.play();
    //         break;

    //     default:console.log(userClickedPattern[userClickedPattern.length - 1]);
    //         break;
    // }

    /* Sloution B */
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();

};

/* add animatePress */
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
};



function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Suceess");
        playSound(userClickedPattern[currentLevel]);

        if (userClickedPattern.length === gamePattern.length) {
            $("#level-title").text("You're doing great!");
            setTimeout(nextSequence, 1000);
        };


    } else {
        console.log("Wrong");
        var errorAudio = new Audio('sounds/wrong.mp3');
        errorAudio.play();

        $("#level-title").text("Ops. Wrong button. Press any key to re-start the game.");
        $('body').addClass('game-over');

        setTimeout(function() {
            $('body').removeClass('game-over'), 2000
        }, 2000);
        
        startOver();

        // setTimeout(location.reload.bind(location), 2000);

    }
};

function startOver() {
    level = 0;
    gamePattern.length = 0;
    started = false;
}
