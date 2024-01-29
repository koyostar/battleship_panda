const optionsContainer = document.querySelector(".optionsContainer");
const playerGameBoard = document.getElementById("playerGameBoard");
const computerGameBoard = document.getElementById("computerGameBoard");

const width = 10;
window.onload = drawBoard();

/////////////////////////////////
const rotateBtn = document.getElementById("rotateBtn");

let position = 0;
const angle = 90;

function rotate() {
  const images = Array.from(optionsContainer.children);
  position = position += angle;
  images.forEach((image) => (image.style.transform = `rotate(${position}deg)`));
  if (position >= 360) {
    position = 0;
  }
}

rotateBtn.addEventListener("click", rotate);

//////////////////////////////

function drawBoard() {
  function createBlock(id) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.id = id;
    return block;
  }

  for (let i = 0; i < width * width; i++) {
    const playerBlock = createBlock(i);
    const computerBlock = createBlock(i);
    playerGameBoard.append(playerBlock);
    computerGameBoard.append(computerBlock);
  }
}

//////////////////////////////////

class option {
  constructor(name, width, length) {
    this.name = name;
    this.width = width;
    this.length = length;
  }
}

const panda = new option("panda", 2, 2);
const miniPanda1 = new option("miniPanda1", 1, 1);
const miniPanda2 = new option("miniPanda2", 1, 1);
const bamboo = new option("bamboo", 1, 3);
const bamboos = new option("bamboos", 2, 3);

const options = [panda, miniPanda1, miniPanda2, bamboo, bamboos];

function placeOptionPiece(user, option) {
  const allBoardBlocks = document.querySelectorAll(`#${user}GameBoard div`);

  let randomStartIndex;
  let currentIndex;
  let startIndex;
  let isRotated;
  let randomBoolean = Math.random() < 0.5;

  if (user === "computer") {
    isRotated = randomBoolean;
    findValidRandomValue();
    startIndex = randomStartIndex;
  } else if (user === "player") {
    if (
      draggedPiece.style.transform.includes("90deg") ||
      draggedPiece.style.transform.includes("270deg")
    ) {
      isRotated = true;
    } else {
      isRotated = false;
    }
    startIndex = startId;
  }

  console.log(randomStartIndex);

  let optionBlocks = [];

  for (let i = 0; i < option.width; i++) {
    for (let j = 0; j < option.length; j++) {
      if (isRotated) {
        currentIndex = startIndex + i * width + j;
      } else {
        currentIndex = startIndex + j * width + i;
      }
      optionBlocks.push(allBoardBlocks[currentIndex]);
    }
  }
  console.log(optionBlocks);

  optionBlocks.forEach((optionBlock) => {
    optionBlock.classList.add(option.name);
    optionBlock.classList.add("taken");
  });

  //////////////////////

  function generateRandomValue() {
    randomStartIndex = Math.floor(Math.random() * width * width);
  }

  function checkStartIndex() {
    for (let i = 0; i < option.width; i++) {
      for (let j = 0; j < option.length; j++) {
        if (isRotated) {
          currentIndex = startIndex + i * width + j;
        } else {
          currentIndex = startIndex + j * width + i;
        }

        if (
          currentIndex + option.length * option.width >=
            allBoardBlocks.length ||
          currentIndex >= allBoardBlocks.length - option.length ||
          currentIndex >= allBoardBlocks.length - option.width ||
          Math.floor(currentIndex / width) + option.length >= width ||
          Math.floor(currentIndex / width) + option.width >= width ||
          allBoardBlocks[currentIndex].classList.contains("taken")
        ) {
          return false;
        }
      }
    }

    return true;
  }

  function findValidRandomValue() {
    generateRandomValue();
    startIndex = randomStartIndex;
    if (checkStartIndex() === false) {
      generateRandomValue();
    } else {
      return randomStartIndex;
    }
  }
}

/////////////////////////////////

const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", startGame);

function startGame() {
  computerGameBoard.innerHTML = "";
  drawBoard();

  options.forEach((option) => placeOptionPiece("computer", option));
}

///////////////////////////////
let draggedPiece;

const optionPieces = Array.from(optionsContainer.children);
optionPieces.forEach((optionPiece) =>
  optionPiece.addEventListener("dragstart", dragStart)
);

const allPlayerBlocks = document.querySelectorAll("#playerGameBoard div");
allPlayerBlocks.forEach((playerBlock) => {
  playerBlock.addEventListener("dragover", dragOver);
  playerBlock.addEventListener("drop", dropPiece);
});

console.log(allPlayerBlocks);

function dragStart(e) {
  draggedPiece = e.target;
}

function dragOver(e) {
  e.preventDefault();
}

function dropPiece(e) {
  const startId = e.target.id;
  const piece = options[draggedPiece.id];
}
