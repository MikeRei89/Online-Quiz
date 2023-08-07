const startScreen = document.querySelector(".startScreen");
const scoreContainer = document.querySelector(".scoreContainer");
const timerElement = document.querySelector(".timer-count");
const startButton = document.querySelector(".start-button");
const choicesList = document.querySelector("#choices");
const questionElement = document.querySelector("#question");

let Score = 0;
let timer;
let timerCount;

const question = [
    {
        question: "Who are you?",
        choices: ["a. M", "b. 2", "c.8", "d.3"],
        answer: "a"
    },
    {
        question: "Who are you?",
        choices: ["a. M", "b. 2", "c.8", "d.3"],
        answer: "a"
    },
    {
        question: "Who are you?",
        choices: ["a. M", "b. 2", "c.8", "d.3"],
        answer: "a"
    },
    {
        question: "Who are you?",
        choices: ["a. M", "b. 2", "c.8", "d.3"],
        answer: "a"
    },
    {
        question: "Who are you?",
        choices: ["a. M", "b. 2", "c.8", "d.3"],
        answer: "a"
    },
];

function startGame() {
    isWin = false;
    timerCount = 30;
    startButton.disabled = true;
    startTimer();
}

function init() {
  Score();
}

// The winGame function is called when the win condition is met
function winGame() {
  wordBlank.textContent = "YOU WON!!!🏆 ";
  winCounter++
  startButton.disabled = false;
  setWins()
}

// The loseGame function is called when timer reaches 0
function loseGame() {
  wordBlank.textContent = "GAME OVER";
  loseCounter++
  startButton.disabled = false;
  setLosses()
}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (isWin && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        winGame();
      }
    }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      loseGame();
    }
  }, 1000);
}


function renderBlanks() {
  // Uses loop to push blanks to blankLetters array
  for (var i = 0; i < numBlanks; i++) {
    blanksLetters.push("_");
  }
}

// Updates win count on screen and sets win count to client storage
function Score() {
  score.textContent = Score;
  localStorage.setItem("Score", score);
}

// These functions are used by init
function getWins() {
  // Get stored value from client storage, if it exists
  var storedWins = localStorage.getItem("winCount");
  // If stored value doesn't exist, set counter to 0
  if (storedWins === null) {
    winCounter = 0;
  } else {
    // If a value is retrieved from client storage set the winCounter to that value
    winCounter = storedWins;
  }
  //Render win count to page
  win.textContent = winCounter;
}

function checkWin() {
  // If the word equals the blankLetters array when converted to string, set isWin to true
  if (chosenWord === blanksLetters.join("")) {
    // This value is used in the timer function to test if win condition is met
    isWin = true;
  }
}

// Attach event listener to document to listen for key event
document.addEventListener("keydown", function(event) {
  // If the count is zero, exit function
  if (timerCount === 0) {
    return;
  }
  // Convert all keys to lower case
  var key = event.key.toLowerCase();
  var alphabetNumericCharacters = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");
  // Test if key pushed is letter
  if (alphabetNumericCharacters.includes(key)) {
    var letterGuessed = event.key;
    checkLetters(letterGuessed)
    checkWin();
  }
});

startButton.addEventListener("click", startGame);

// Calls init() so that it fires when page opened
init();

// Bonus: Add reset button
var resetButton = document.querySelector(".reset-button");

function resetGame() {
  // Resets score counts
  Score = 0;
  // Renders score counts and sets them into client storage
  setScore()
}
// Attaches event listener to button
resetButton.addEventListener("click", resetGame);