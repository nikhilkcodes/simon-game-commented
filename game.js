// Define an array of button colors that will be used in the game.
var buttonColours = ["red", "blue", "green", "yellow"];

// Initialize empty arrays to store the randomly generated game pattern and user's clicked pattern.
var gamePattern = [];
var userClickedPattern = [];

// Variables to keep track of game state.
var started = false; // Indicates whether the game has started or not.
var level = 0; // Keeps track of the current level of the game.

// Listen for keypress event on the document. When a key is pressed, the game starts.
$(document).keypress(function() {
  if (!started) { // Check if the game has not started yet.
    $("#level-title").text("Level " + level); // Update the level title on the webpage.
    nextSequence(); // Start the game by calling the nextSequence() function.
    started = true; // Set started to true so that the game won't restart on subsequent keypresses.
  }
});

// Attach a click event handler to buttons with class "btn". This function is called when a button is clicked.
$(".btn").click(function() {
  // Get the color of the clicked button and store it in userChosenColour.
  var userChosenColour = $(this).attr("id");
  
  // Add the user's chosen color to the userClickedPattern array.
  userClickedPattern.push(userChosenColour);
  
  // Play the corresponding sound for the clicked button.
  playSound(userChosenColour);
  
  // Animate the button to show a click effect.
  animatePress(userChosenColour);
  
  // Check the user's answer after each click by calling the checkAnswer() function.
  // Pass the index of the last clicked element as the argument.
  checkAnswer(userClickedPattern.length - 1);
});

// Function to check the user's answer against the game pattern.
function checkAnswer(currentLevel) {
  // If the user's input matches the game pattern at the current level.
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // If the user has correctly clicked the entire pattern for this level.
    if (userClickedPattern.length === gamePattern.length) {
      // Wait for 1 second, then move to the next level by calling nextSequence().
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else { // If the user's input is incorrect.
    // Play the "wrong" sound.
    playSound("wrong");
    
    // Add a red color flash effect to the body of the webpage to indicate the wrong answer.
    $("body").addClass("game-over");
    
    // Update the level title to show "Game Over, Press Any Key to Restart".
    $("#level-title").text("Game Over, Press Any Key to Restart");
    
    // After a 200ms delay, remove the red color flash effect.
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    
    // Restart the game by calling the startOver() function.
    startOver();
  }
}

// Function to generate the next color in the game pattern.
function nextSequence() {
  // Reset the userClickedPattern for the next level.
  userClickedPattern = [];
  
  // Increment the level and update the level title.
  level++;
  $("#level-title").text("Level " + level);
  
  // Generate a random number between 0 and 3 (inclusive) to select a random color from buttonColours.
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  
  // Add the random color to the gamePattern.
  gamePattern.push(randomChosenColour);
  
  // Show a brief fadeIn/fadeOut effect on the button corresponding to the random color.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  
  // Play the corresponding sound for the random color.
  playSound(randomChosenColour);
}

// Function to add and remove the "pressed" class for the animation effect when a button is clicked.
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Function to play the sound corresponding to the input color.
function playSound(name) {
  // Create an Audio object and play the sound file based on the input color.
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Function to reset the game to its initial state.
function startOver() {
  // Reset level, gamePattern, and started to their initial values.
  level = 0;
  gamePattern = [];
  started = false;
}
