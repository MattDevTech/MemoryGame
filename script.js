const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let allCards = '';
let currentGuessCount = 0;
let currentCard = '';
let lastCard = '';
let scoreboard = '';
let startButton = document.querySelector("#Start");
let restartButton = '';
let matchedCount = 0;
let bestScoreDisplay = document.querySelector("#bestScore");

if (localStorage.getItem("Best Score") !== null){
  bestScoreDisplay.innerText = `Welcome Back! Your Best Score So Far Is ${localStorage.getItem("Best Score")}`;
}
else {
  bestScoreDisplay.innerText = `WELCOME NEW PLAYER!`;
}
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a data attribute for the value we are looping over
    newDiv.dataset.color = color;
    newDiv.dataset.matchedStatus = false;
    newDiv.classList.add("card");

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  lastCard = currentCard;
  currentCard = event.target;
  currentCard.classList.add(currentCard.dataset.color)
  // debugger;
   
    if (currentGuessCount % 2 === 0) {
      currentGuessCount++;
      scoreboard.innerText = `Your Current Score is: ${currentGuessCount}`;
      currentCard.removeEventListener("click", handleCardClick);
    }
  
    else {
      if (currentCard.dataset.color !== lastCard.dataset.color) {
      currentGuessCount++;
      scoreboard.innerText = `Your Current Score is: ${currentGuessCount}`;
      currentCard.removeEventListener("click", handleCardClick);
      window.addEventListener("click", stopEventListeners, true);
      setTimeout(blankBackground, 1000);    
      }
      else {
      currentGuessCount++;
      scoreboard.innerText = `Your Current Score is: ${currentGuessCount}`;
      currentCard.removeEventListener("click", handleCardClick);
      currentCard.dataset.matchedStatus = true;
      lastCard.dataset.matchedStatus = true;
      matchedCount++;
      if (matchedCount === (allCards.length/2)){
        setTimeout(function() {
          alert(`You win! It only took you ${currentGuessCount} guesses!`)
        }, 250)        
        if (localStorage.getItem("Best Score") === null || currentGuessCount < localStorage.getItem("Best Score")){
          localStorage.setItem("Best Score", `${currentGuessCount}`);
        }
      }
      }
    }
}

function blankBackground() {
  lastCard.classList.remove(`${lastCard.dataset.color}`);
  currentCard.classList.remove(`${currentCard.dataset.color}`);
  lastCard.addEventListener("click", handleCardClick);
  currentCard.addEventListener("click", handleCardClick);
  window.removeEventListener("click", stopEventListeners, true);
  currentCard = '';
  lastCard = '';
}

function stopEventListeners(event) {
  event.stopPropagation();
}

function createScoreboard() {
  scoreboard = document.createElement("h3");
  scoreboard.innerText = `Your Current Score is: ${currentGuessCount}`;
  scoreboard.classList.add("scoreboard");
  gameContainer.prepend(scoreboard);
}

function startGame() {
  let shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
  allCards = gameContainer.querySelectorAll(".card");
  createScoreboard();
  startButton.removeEventListener("click", startGame);
  startButton.remove();
  restartButton = document.createElement("button");
  restartButton.innerText = "Restart Game";
  gameContainer.prepend(restartButton);
  restartButton.addEventListener("click", restartGame);
}

function removeCards() {
  for (let card of allCards) {
    card.remove();
  }
}

function updateBestScoreDisplay() {
  bestScoreDisplay.innerText = `Welcome Back! Your Best Score So Far Is ${localStorage.getItem("Best Score")}`;
}

function restartGame() {
  removeCards();
  restartButton.remove();
  scoreboard.remove();
  currentGuessCount = 0;
  currentCard = '';
  lastCard = '';
  let shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
  createScoreboard();
  startButton.removeEventListener("click", startGame);
  startButton.remove();
  restartButton = document.createElement("button");
  restartButton.innerText = "Restart Game";
  gameContainer.prepend(restartButton);
  restartButton.addEventListener("click", restartGame);
  updateBestScoreDisplay();
}

startButton.addEventListener("click", startGame);