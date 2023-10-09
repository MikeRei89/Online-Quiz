//Using JavaScript Native
const startScreen = document.querySelector(".startScreen");
const scoreContainer = document.querySelector(".scoreContainer");
const timerElement = document.querySelector(".timer-count");
const startButton = document.querySelector(".start-button");
const choicesList = document.querySelector("#choices");
const questionElement = document.querySelector("#question");
const scoreElement = document.querySelector(".score");
//Using JQuery Below
const questionContainer = $("#questionContainer");
const welcomeContainer = $("#welcomeContainer");

let score = 0;
let timer;
let timerCount;
var currentQuestion = 1;
let currentAnswer = "";

// INPUT - DOWORK - OUTPUT

const questions = [
    {
        question: "What sitcom was Will Smith in during the 90's?",
        choices: [{
          description: "All in the Family", 
          answer: "A"
        }, {
          description: "The Fresh Prince of Bel Air", 
          answer: "B"
        }, {
          description: "Family Matters", 
          answer: "C"
        }, {
          description: "Friends", 
          answer: "D"
        }],
        answer: "B",
        id:1
    },
    {
      question: "What famous British princess passed away in 1997?",
      choices: [{
        description: "Kate", 
        answer: "A"
      }, {
        description: "Charlotte", 
        answer: "B"
      }, {
        description: "Ann", 
        answer: "C"
      }, {
        description: "Diana", 
        answer: "D"
      }],
      answer: "D",
      id:2
  },
  {
    question: "What boyband included the singer Justin Timberlake?",
    choices: [{
      description: "Backstreet Boys", 
      answer: "A"
    }, {
      description: "Nsync", 
      answer: "B"
    }, {
      description: "Boyz 2 Men", 
      answer: "C"
    }, {
      description: "New kids on the Block", 
      answer: "D"
    }],
    answer: "B",
    id:3
  },
  {
  question: "What reality tv show debuted in the 90s?",
  choices: [{
    description: "The Bachelor", 
    answer: "A"
  }, {
    description: "Survivor", 
    answer: "B"
  }, {
    description: "The Real World", 
    answer: "C"
  }, {
    description: "MasterChef", 
    answer: "D"
  }],
  answer: "C",
  id:4
},
{
  question: "What does AOL stand for?",
  choices: [{
    description: "Assests of Life", 
    answer: "A"
  }, {
    description: "Auto Of London", 
    answer: "B"
  }, {
    description: "America Online", 
    answer: "C"
  }, {
    description: "Animals of Life", 
    answer: "D"
  }],
  answer: "C",
  id:5
},
];

function loadNextQuestion(questionID) {
    if(questionID > questions.length) questionID = 1
  // STEP 1 - GRAB REQESUTED QUESTION FROM ARRAY
    const questionData = questions.find(function (question) {return question.id === questionID});
    console.log(questionData.choices)
  // STEP 2 - UPDATE QUESTION TEXT BASED ON QUESTION DATA
    questionElement.textContent = questionData.question
  // STEP 3 - UPDATE BUTTON CHOICES BASED ON DATA
    choicesList.innerHTML = loadButtons(questionData.choices)
  // STEP 4 - INCRIMENT SCORE IF CORRECT ANSWER WAS SELECTED
  // STEP 5 - INCRIMENT COUNT BY ONE FOR NEXT QUESTION 
    // for (var i=0; false; i++)
  // STEP 6 - UPDATE CURRENT ANSWER BASED ON CURRENT QUESTION
    currentAnswer = questionData.answer

}

function loadButtons (answers) {
   let buttonHtml = ""
   answers.forEach(choice => {
   buttonHtml += `<button class="btn" data-answer="${choice.answer}">${choice.description}</button>`
   });
  // return `<button class="btn">Answer 1</button>`
  return buttonHtml
}


function startGame() {
    questionContainer.show();
    welcomeContainer.hide();
    loadNextQuestion(1)
    isWin = false;
    timerCount = 30;
    startButton.disabled = true;
    startTimer();
}

function init() {
// First - welcome container is visible
    welcomeContainer.show();
    questionContainer.hide();
    updateScore();
}

// // The winGame function is called when the win condition is met
// function winGame() {
//   wordBlank.textContent = "YOU WON!!!🏆 ";
//   winCounter++
//   startButton.disabled = false;
//   setWins()
// }

// // The loseGame function is called when timer reaches 0
// function loseGame() {
//   wordBlank.textContent = "GAME OVER";
//   loseCounter++
//   startButton.disabled = false;
//   setLosses()
// }

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
    }
  }, 1000);
}

// Updates win count on screen and sets win count to client storage
function updateScore() {
  scoreElement.textContent = score;
}

startButton.addEventListener("click", startGame);
choicesList.addEventListener("click", function (event) {
  console.log("The correct answer is " + currentAnswer)
  console.log("The selected answer is " + event.target.dataset.answer)
  currentQuestion++
  loadNextQuestion(currentQuestion)
  if(event.target.dataset === currentAnswer) {
    score++
    updateScore()
  } 

})
// Calls init() so that it fires when page opened
init();

// Bonus: Add reset button
var resetButton = document.querySelector(".reset-button");

function resetGame() {
  // RESET QUESTIONS TO 1 
  currentQuestion = 1
  currentAnswer = 0
  score = 0
  updateScore()
}
// Attaches event listener to button
resetButton.addEventListener("click", resetGame);