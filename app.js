let powerOn = document.querySelector("#power");
let onOffLight = document.querySelector("#on-off-light");
let scoreCreditBoard = document.querySelector("#score-credit-board");
let score = document.querySelector("#score");
let credit = document.querySelector("#credit");
let gameContent = document.querySelector("#game");
let start = document.querySelector("#start-button");
let chest =  document.querySelectorAll(".chest");
let insertCoin = document.querySelector("#insert-coin");
let message = document.querySelector("#message");
let guide = document.querySelector("#guide");
let on = false;
let victory;
let creditCount = 0;
let scoreCount = 0;


powerOn.addEventListener("click", machineOn); // TURNING THE GAME MACHINE ON --
insertCoin.addEventListener("click", addCredit); // ADDING CREDIT WITH INSERT COIN BUTTON --
start.addEventListener("click", randomize); // SHUFFLING TREASURE CHESTS WHEN PRESSING PLAY --
message.addEventListener("click", hide); // EXITING USER MESSAGES AND RESETTING GAME STATUS --


function machineOn() {

  if (on === false) {
    on = true;
    document.querySelectorAll(".chest-content").forEach(surprise => surprise.style.display = "none");
    guide.style.display = "none";
    gameContent.style.display = "flex";
    gameContent.style.animation = "opening-content 0.4s ease-out 1 forwards";
    scoreCreditBoard.style.display = "block";
    start.style.visibility = "visible";
    onOffLight.style.backgroundColor = "rgb(0, 170, 32)";
    onOffLight.style.borderColor = "rgb(94, 255, 154)";
  }
  else {
    on = false;
    creditCount = 0;
    scoreCount = 0;
    credit.innerText = "CREDIT: " + creditCount; // RESETTING CREDIT WHEN TURNING OFF --
    score.innerText = "CURRENT SCORE: " + scoreCount; // RESETTING SCORE WHEN TURNING OFF --
    chest.forEach(elem => elem.removeEventListener("click", show)); // RESETTING CHESTS STATUS TO UNCLICKABLE --
    gameContent.style.animation = "closing-content 0.4s ease-out 1 forwards";
    scoreCreditBoard.style.display = "none";
    message.style.display = "none";
    guide.style.display = "flex";
    onOffLight.style.backgroundColor = "var(--innerRed)";
    onOffLight.style.borderColor = "var(--outerRed)";
  }
}

function addCredit() {

  if (on === true) {
    creditCount++;
    credit.innerText = "CREDIT: " + creditCount;
    message.style.display = "none";
    message.addEventListener("click", hide); // ALLOWING USER TO CLOSE 'NO CREDIT' MESSAGE AFTER ADDING CREDIT --
    gameContent.style.display = "flex";
  }
}


function randomize() {

  if (creditCount == 0) {
    message.removeEventListener("click", hide); // MAKING 'NO CREDIT' MESSAGE UNCLOSABLE UNTIL CREDIT IS ADDED --
    gameContent.style.display = "none";
    message.style.display = "flex";
    message.innerHTML = "NO CREDIT!!<br>TAP ON THE 'INSERT COIN' BUTTON TO ADD SOME!!";
  }
  else {
    creditCount--;
    credit.innerText = "CREDIT: " + creditCount;
    message.style.display = "none"
    message.innerHTML = "";
    start.style.visibility = "hidden";
    chest[0].style.animation = "shuffling-first 2s linear";
    chest[2].style.animation = "shuffling-third 2s linear";
    chest[0].addEventListener("animationend", animate); // TRIGGERING SECOND ANIMATION AND ENABLING CHEST SELECTION --


    // RANDOMIZING CHESTS CONTENT --
    let initialPosition = ["<img src='images/gold-pot.svg' id='treasure' class='chest-content'>", "<img src='images/cross-mark.svg' class='chest-content'>", "<img src='images/cross-mark.svg' class='chest-content'>"];

    let position = [];

    for (let i = 0; i < chest.length; i++) {

      while (initialPosition.length > 0) {
        position = position.concat(initialPosition.splice(Math.floor(Math.random()*initialPosition.length), 1));
      }
      chest[i].innerHTML = position[i];
    }
  }
}

function animate() {
  chest.forEach(chest => chest.style.animation = "animated-treasures 2.5s infinite linear");
  chest.forEach(chest => chest.addEventListener("click", show));
}

function show(event) {
  chest.forEach(chest => chest.style.animation = "none");
  document.querySelectorAll(".chest-content").forEach(surprise => surprise.style.display = "block");

  if (event.target.firstChild.id === "treasure") {
    victory = true;
  }
  else {
    victory = false;
}
  endOfGame();
}


function endOfGame() {
  message.style.display = "flex";

  if (victory === true) {
    scoreCount += 50;
    score.innerText = "CURRENT SCORE: " + scoreCount;
    message.innerHTML = "CONGRATULATIONS!! YOU'VE FOUND THE TREASURE!!<br>PRESS TO PLAY AGAIN!!";
  }
  else {
    message.innerHTML = "OOPS LOOKS LIKE YOU'VE GOT YOUR POCKETS EMPTY!!<br>PRESS TO PLAY AGAIN!!"
  }
}


//RESETTING GAME STATUS AFTER 'END OF GAME' MESSAGE --
function hide() {
  chest.forEach(elem => elem.removeEventListener("click", show));
  document.querySelectorAll(".chest-content").forEach(surprise => surprise.style.display = "none");
  message.style.display = "none";
  message.innerHTML = "";
  gameContent.style.display = "flex";
  start.style.visibility = "visible";
}
