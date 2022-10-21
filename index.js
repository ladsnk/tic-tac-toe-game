const resultMessage = document.querySelector(".result-message");
const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");
const restartButton = document.querySelector("button");

const xFigure = "<i class='fa-solid fa-x'></i>";
const oFigure = "<i class='fa-regular fa-circle'></i>";
let xTurn = true;
let currentClass;
const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  cells.forEach((cell) => {
    if (cell.hasChildNodes()) {
      cell.removeChild(cell.firstChild);
    }
    cell.addEventListener("click", handleClick, { once: true });
  });
  resultMessage.classList.remove("show");
  board.classList.remove("game-over");
}

function handleClick(event) {
  const cell = event.target;
  currentClass = xTurn ? "fa-x" : "fa-circle";
  // Putting mark
  mark(cell, currentClass);
  // Checking for win
  if (checkWin(currentClass)) {
    endGame(false);
  }
  // Checking for draw
  if (isDraw()) {
    endGame(true);
  }
}

function mark(cell) {
  xTurn ? (cell.innerHTML = xFigure) : (cell.innerHTML = oFigure);
  xTurn = !xTurn;
}

function checkWin(currentClass) {
  return winCombinations.some((combination) => {
    return combination.every((index) => {
      if (cells[index].firstChild) {
        return cells[index].firstChild.classList.contains(currentClass);
      }
    });
  });
}

function isDraw() {
  return [...cells].every((cell) => {
    return cell.firstChild;
  });
}

function endGame(result) {
  if (result) {
    resultMessage.innerText = "Draw";
  }
  if (!result) {
    resultMessage.innerHTML = `${!xTurn ? xFigure : oFigure} won!`;
    board.classList.add("game-over");
  }
  resultMessage.classList.add("show");
}
