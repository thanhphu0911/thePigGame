"use strict";

// Selecting elements for the game
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Selecting elements for the game's rules
const modal = document.querySelector(".modal");
const hidden = document.querySelector(".hidden");
const btnCloseModal = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");
const btnsShowModal = document.querySelector(".show-modal");

let scores, currentScore, activePLayer, isPlaying;

//Starting conditions
function startGame() {
  currentScore = 0;
  activePLayer = 0;
  scores = [0, 0];
  isPlaying = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
}

function switchPlayer() {
  //switch to another player
  document.getElementById(`current--${activePLayer}`).textContent = 0;
  activePLayer = activePLayer === 0 ? 1 : 0;
  // current score back to 0
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}

startGame();
//Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (isPlaying) {
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    //3. Check for rolled 1: if true,
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePLayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Hold functionality
btnHold.addEventListener("click", function () {
  if (isPlaying) {
    // 1. Add current score to active player's score
    scores[activePLayer] += currentScore;
    document.getElementById(`score--${activePLayer}`).textContent =
      scores[activePLayer];

    //2. Check if the player's score is 100
    if (scores[activePLayer] >= 100) {
      //Finish the game
      isPlaying = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePLayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePLayer}`)
        .classList.remove("player--active");
    } else {
      //3. Swich the player
      switchPlayer();
    }
  }
});

// Resetting the game
btnNew.addEventListener("click", startGame);

//Game rules functionality

function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

btnsShowModal.addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
