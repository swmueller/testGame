var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var iLevel=0;
var iLevelTest=0;
var iStarted=0;
var iCurrent=0;
var oldText;

function nextSequence() {
  var randomNumber=Math.floor(Math.random()*4);
  var rColour = buttonColours[randomNumber];
  //console.log(gamePattern);
    $("#level-title").text("Level:" +iLevel);
    setTimeout(function(){
      $("#" + rColour).fadeIn(100).fadeOut(100).fadeIn(100);
  },300);
  gamePattern.push(rColour);

  iLevel++;
  console.log(gamePattern);
}

function fplaySound(sColor) {
//console.log ("playsound");
  var url="./sounds/" + sColor + ".mp3";
  //onsole.log ("sound:" +url);
  var audio = new Audio(url);
  audio.play();

}

function animatePress(currentColor) {
   $("#"+currentColor).addClass("pressed");
   setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
      },200);

}
function gameOver () {
  //reset counter, arrays,  title, animate game over
  iStarted=0;
  iLevel=0;
  $("body").addClass("game-over");
  $("#level-title").text("Game Over 🤭, Eric, Press Any Key to Restart");
  $(".container").fadeOut();
  setTimeout(function () {
     $("body").removeClass("game-over");
  }, 500);
  fplaySound("wrong");
  userClickedPattern = [];
  gamePattern=[];
}

function showStartWithKeyBoard(){
  oldText= $("#level-title").text();
  $("#level-title").text("PRESS KEY ON KEYBOARD TO START");
  $("#level-title").fadeToggle().fadeToggle().fadeToggle().fadeToggle();
  fplaySound("wrong");
  setTimeout(function() {
    $("#level-title").text(oldText);
    },1000)
}

function checkAnswer(i){
  //console.log ("checkAnswer:" + i);
  //console.log (gamePattern);
  //console.log(userClickedPattern);
  var result="success";
  if (gamePattern[i]!==userClickedPattern[i]) {
    gameOver();

  } else {
      fplaySound(gamePattern[i]);
      iCurrent++;
      //console.log (iLevel + ":" + iCurrent);
      if (iLevel===iCurrent)
        {
          // new round
          iCurrent=0;
          setTimeout(function(){
            nextSequence();
          } ,1200);
          userClickedPattern=[];
      }
    }
}

function startGame(){
  $(".container").fadeOut();

    var iCounter=4;

    $("#level-title").text(iCounter);
    for (var i=0;i<iCounter;i++){
        setTimeout(function(){
            iCount= $("#level-title").text();
           console.log(iCounter);
             $("#level-title").text(iCount-1);
        },800*i);
        if (i===0){
           setTimeout(function(){
               $(".container").toggle();
                } ,800*iCounter);
            setTimeout(function(){
                $("#level-title").text("Game started color order");
              } ,900*iCounter);
                setTimeout(function(){
                    nextSequence();
                  } ,1300*iCounter);
        }
        console.log(iCounter-i);
       iStarted=1;
      //$("#counterlbl").text(iCounter-i);
      $("#level-title").toggle().toggle();
    }
}

$(".btn").click(function() {
   if (iStarted!==0) {
    var userChosenColour  = $(this).attr('id');
    fplaySound(userChosenColour);
    animatePress(userChosenColour);
    //console.log ("id of button=" + userChosenColour );
    userClickedPattern.push(userChosenColour);
    checkAnswer(iCurrent);
  } else {
      showStartWithKeyBoard();
  }
});

$(document).on("click",function(){
  console.log("onclick");
    if (iStarted===0) {
        showStartWithKeyBoard();
      }
 });


 $("body").keypress(function(){
   if (iStarted===0) {
      startGame();
   }
 });
